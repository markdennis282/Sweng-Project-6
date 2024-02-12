# main.py

import time
import schedule
from web_page_crawler import WebPageCrawler
from PDF_crawler import PDFCrawler  
from API_crawler import APICrawler
from file_crawler import FileCrawler


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
    
# Schedule the `run_crawlers` function to run every hour
schedule.every(1).hour.do(run_crawlers)

def main():
    run_crawlers()
    # Start the scheduled task
    while True:
        schedule.run_pending()
        time.sleep(1)

if __name__ == "__main__":
    main()
