import PyPDF2
from base_crawler import BaseCrawler

class PDFCrawler(BaseCrawler):
    def fetch_document(self):
        """
        Opens a PDF file from the specified path in the source_config.
        """
        try:
            # Assuming 'file_path' is a key in source_config dict pointing to the location of the PDF file
            file_path = self.source_config['file_path']
            return open(file_path, 'rb')  # 'rb' mode opens the file in binary read mode
        except Exception as e:
            raise Exception(f"Failed to open PDF file at {file_path}: {e}")


    def extract_content(self, document):
    # """
    # Extracts text from the opened PDF document using PyPDF2 and combines it into one continuous string.
    # """
        try:
            reader = PyPDF2.PdfReader(document)
            text = []
            for page in reader.pages:
                # Extract text and remove unwanted newline characters
                page_text = page.extract_text().replace('\n', ' ')
                text.append(page_text)
            # Join all text segments into a single string, with a space between page contents
            return ' '.join(text)
        except Exception as e:
            raise Exception(f"Failed to extract text from PDF: {e}")
        finally:
            document.close()  # Ensure the file is closed after processing

    def return_content(self):
        try:
            document = self.fetch_document()
            content = self.extract_content(document)
            return content
        except Exception as e:
            print(f"Error in returning content: {e}")
            return None

    
    def run(self):
        # Overriding the run method to handle file opening/closing
        document = self.fetch_document()
        content = self.extract_content(document)
        self.process_content(content)
