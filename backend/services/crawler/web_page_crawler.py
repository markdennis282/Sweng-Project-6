# web_page_crawler.py

import requests
from bs4 import BeautifulSoup
from base_crawler import BaseCrawler

class WebPageCrawler(BaseCrawler):
    def fetch_document(self):
        try:
            url = self.source_config['url']
            print(url)
            response = requests.get(url)
            if response.status_code == 200:
                return response.text
            else:
                raise Exception(f"Failed to fetch {url}")
        except KeyError as e:
            print(f"KeyError in fetch_document: {e}")
            raise

    def extract_content(self, document):
        soup = BeautifulSoup(document, 'html.parser')
        return soup.body.get_text(separator=' ', strip=True)
