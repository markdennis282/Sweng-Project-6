import requests
from base_crawler import BaseCrawler

class APICrawler(BaseCrawler):
    def fetch_document(self):
        response = requests.get(self.source_config['endpoint'], headers=self.source_config.get('headers', {}))
        if response.status_code == 200:
            return response.json()  # Assuming the API returns JSON data
        else:
            raise Exception(f"Failed to fetch data from API {self.source_config['endpoint']}")

    def extract_content(self, document):
        # Process the JSON data as needed, potentially navigating through nested structures
        return document  # This is a placeholder; you would extract and return the relevant data
