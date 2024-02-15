import sqlite3
from datetime import datetime

class DatabaseConnector:
    def __init__(self, db_type, db_name):
        self.db_type = db_type
        self.db_name = db_name
        self.connection = None
        self.cursor = None

    def connect(self):
        if self.db_type == 'sqlite':
            self.connection = sqlite3.connect(self.db_name)
            self.cursor = self.connection.cursor()
        #Future proofing for other database types
        else:
            raise ValueError(f"Unsupported database type: {self.db_type}")


    def disconnect(self):
        if self.connection:
            self.connection.close()

    def store_document(self, document):
        if not self.connection:
            self.connect()
        #Default identifier, for now.
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        query = "INSERT INTO documents (timestamp, content) VALUES (?, ?)"
        self.cursor.execute(query, (timestamp, document))
        self.connection.commit()

    def __del__(self):
        self.disconnect()

#Testing
if __name__ == "__main__":
    db_connector = DatabaseConnector(db_type='sqlite', db_name='testingDB.db')
    db_connector.connect()
    example_document = "Sample Document Content."
    db_connector.store_document(example_document)
    db_connector.disconnect()
