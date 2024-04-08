# base_crawler.py

class BaseCrawler:
    def __init__(self, source_config):
        self.source_config = source_config

    def fetch_document(self):
        raise NotImplementedError("Subclass must implement abstract method")

    def extract_content(self, document):
        raise NotImplementedError("Subclass must implement abstract method")

    def process_content(self, content):
        print(content)  # Placeholder for processing logic

    def run(self):
        document = self.fetch_document()
        content = self.extract_content(document)
        self.process_content(content)
