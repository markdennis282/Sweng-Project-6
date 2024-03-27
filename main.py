import threading
import json
from flask import Flask, jsonify, request
from web_page_crawler import WebPageCrawler
from PDF_crawler import PDFCrawler  
from API_crawler import APICrawler
from file_crawler import FileCrawler
from DatabaseConnector import DatabaseConnector
import time

app = Flask(__name__)

scheduled_jobs = []
lock = threading.Lock()

def run_crawler_on(type, config):
    try:
        if type == "web":
            web_crawler = WebPageCrawler(config)
            data = web_crawler.extract_content(web_crawler.fetch_document())
        elif type == "pdf":
            pdf_crawler = PDFCrawler(config)
            data = pdf_crawler.return_content()
        elif type == "api":
            api_crawler = APICrawler(config)
            raw_data = api_crawler.fetch_document()
            data = api_crawler.extract_content(raw_data)
        elif type == "file":
            file_crawler = FileCrawler(config)
            data = file_crawler.fetch_document()
        else:
            print("Invalid type")

        if data is not None:
            print("Data extracted successfully, storing in the database.")
            # db_connector = DatabaseConnector(db_type='sqlite', db_name='testingDB.db')
            # db_connector.connect()
            # db_connector.store_document(data)
            # db_connector.disconnect()
            print(data)
            print("Data stored successfully.")
    except Exception as e:
        print(f"Error occurred during {type} crawler execution: {str(e)}")

def run_crawler_from_config_file(configurations):
    for config in configurations:
        if isinstance(config, dict):
            type = config.get("type")
            crawler_config = config.get("config")
            run_crawler_on(type, crawler_config)
        else:
            print(f"Ignoring invalid configuration: {config}")

def schedule_crawlers(configurations, seconds):
    global scheduled_jobs
    with lock:
        scheduled_jobs.clear()
        for config in configurations:
            t = threading.Thread(target=run_crawler_from_config_file, args=([config],))
            scheduled_jobs.append(t)
            t.start()
    time.sleep(seconds)

def background_scheduler(configurations, seconds):
    while True:
        schedule_crawlers(configurations, seconds)

@app.route('/config', methods=['GET'])
def get_config():
    with open('crawler_config.json', 'r') as file:
        config = json.load(file)
    return jsonify(config)

@app.route('/config', methods=['POST'])
def add_config():
    new_config = request.json
    with open('crawler_config.json', 'r') as file:
        config = json.load(file)
    config.append(new_config)
    with open('crawler_config.json', 'w') as file:
        json.dump(config, file, indent=4)
    return jsonify({'message': 'Configuration added successfully'}), 201

@app.route('/run', methods=['POST'])
def run_crawler():
    with open('crawler_config.json', 'r') as file:
        configurations = json.load(file)
    run_crawler_from_config_file(configurations)
    return jsonify({'message': 'Crawlers executed'}), 200

@app.route('/schedule', methods=['POST'])
def schedule_crawler():
    seconds = int(request.args.get('seconds', 3600))  # Default is 1 hour (3600 seconds)
    with open('crawler_config.json', 'r') as file:
        configurations = json.load(file)
    threading.Thread(target=background_scheduler, args=(configurations, seconds)).start()
    return jsonify({'message': f'Crawlers scheduled to run every {seconds} seconds'}), 200

if __name__ == "__main__":
    app.run(debug=True)
