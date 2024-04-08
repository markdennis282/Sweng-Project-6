import requests
from bs4 import BeautifulSoup
import PyPDF2


def crawl_web_page(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Function to extract information based on the row title
        def extract_info(row_title):
            th = soup.find('th', text=row_title)
            if th:
                td = th.find_next_sibling('td')
                if td:
                    return td.get_text(strip=True)
            return 'Not found'

        # Define the information you want to extract
        info_titles = [
            'Company type', 'Industry', 'Founded', 'Founders', 'Headquarters',
            'Key people', 'Products', 'AUM', 'Number of employees', 'Subsidiaries', 'Website'
         ]


        # Extract and print the information
        for title in info_titles:
            info = extract_info(title)
            print(f'{title}: {info}')
    else:
        print(f"Failed to retrieve data from {url}")


def extract_text_from_pdf(pdf_path):
    # Open the PDF file
    with open(pdf_path, 'rb') as file:
        # Create a PdfReader object
        pdf_reader = PyPDF2.PdfReader(file)
        
        # Initialize an empty string to store the extracted text
        text = ''
        
        # Loop through each page of the PDF
        for page_num in range(len(pdf_reader.pages)):
            # Extract text from the current page
            page_text = pdf_reader.pages[page_num].extract_text()
            
            # Append the extracted text to the overall text string
            text += page_text
        
        return text
    
    

# Example usage with the Millennium Management Wikipedia page
crawl_web_page('https://en.wikipedia.org/wiki/Millennium_Management,_LLC')
pdf_path = '/Users/markdennis/Desktop/2024/2024CV.pdf'
pdf_text = extract_text_from_pdf(pdf_path)
print(pdf_text)


