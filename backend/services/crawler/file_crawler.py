from base_crawler import BaseCrawler

class FileCrawler(BaseCrawler):
    def fetch_document(self):
        with open(self.source_config['file_path'], 'r') as file:
            return file.read()

    def extract_content(self, document):
        # Directly return the document content or perform necessary processing
        return document
