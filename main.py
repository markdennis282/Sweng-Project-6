# main.py

import time
import schedule
import json
from web_page_crawler import WebPageCrawler
from PDF_crawler import PDFCrawler  
from API_crawler import APICrawler
from file_crawler import FileCrawler
from DatabaseConnector import DatabaseConnector


def run_crawler_on(type, config):
    if type == "web":
        web_crawler = WebPageCrawler(config)
        data = web_crawler.extract_content(web_crawler.fetch_document())
    elif(type == "pdf"):
        pdf_crawler = PDFCrawler(config)
        data = pdf_crawler.return_content()
    elif type == "api":
        api_crawler = APICrawler(config)
        raw_data = api_crawler.fetch_document()
        data = api_crawler.extract_content(raw_data)
    elif(type == "file"):
        file_crawler = FileCrawler(config)
        data = file_crawler.fetch_document()
    else:
        print("Invalid type")

    if data is not None:
        print("Data extracted successfully, storing in database.")
        # db_connector = DatabaseConnector(db_type='sqlite', db_name='testingDB.db')
        # db_connector.connect()
        # db_connector.store_document(data)
        # db_connector.disconnect()
        print(data)
        print("Data stored successfully.")


def run_crawler_from_config_file(configurations):
    for config in configurations:
        type = config.get("type")
        crawler_config = config.get("config")
        run_crawler_on(type, crawler_config)


def run_crawlers():
    web_page_crawler_config = {
        'url': 'https://en.wikipedia.org/wiki/Millennium_Management,_LLC'
    }

    # Example for a PDF crawler configuration
    pdf_crawler_config = {
        'file_path': '/Users/markdennis/Desktop/2024/2024CV.pdf'
    }
        # API Crawler configuration
    api_crawler_config = {
        'endpoint': 'https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=1fe6b55e7c5387ed2ee74d901c1febab',
        'headers': {
            'Authorization': '1fe6b55e7c5387ed2ee74d901c1febab'
        }
    }
    file_crawler_config = {
        'file_path': '/Users/markdennis/Desktop/thirdY/networks/assignment1/java-example/message.txt'  # Update this path to your target file
    }

    web_crawler = WebPageCrawler(web_page_crawler_config)
    web_crawler.run()

    # Example of initializing and running a PDF crawler
    pdf_crawler = PDFCrawler(pdf_crawler_config)
    pdf_crawler.run()
        # Initialize and run the API Crawler
    api_crawler = APICrawler(api_crawler_config)
    api_crawler.run()
        # Initialize and run the FileCrawler
    file_crawler = FileCrawler(file_crawler_config)
    file_crawler.run()
    
def schedule_crawlers(configurations):
    schedule.every(1).hour.do(run_crawler_from_config_file, configurations)

def main():
    with open('crawler_config.json', 'r') as file:
        configurations = json.load(file)

        run_crawler_from_config_file(configurations)
        schedule_crawlers(configurations)

        # Start the scheduled task
        while True:
            schedule.run_pending()
            time.sleep(1)

    # run_crawlers()
    # # Start the scheduled task
    # while True:
    #     schedule.run_pending()
    #     time.sleep(1)

if __name__ == "__main__":
    main()
