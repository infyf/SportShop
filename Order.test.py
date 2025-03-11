import sqlite3
import pandas as pd  
import unittest
import xmlrunner
import sys
import os

class TestDatabaseOperations(unittest.TestCase):
    
    @classmethod
    def setUpClass(cls):
        cls.conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Order.db')
        cls.cursor = cls.conn.cursor()
    
    @classmethod
    def tearDownClass(cls):
        cls.conn.close()

    def test_select(self):
        query = "SELECT * FROM sport"
        self.cursor.execute(query)
        result = self.cursor.fetchall()
        self.assertIsNotNone(result)  # Перевіряємо, що запит повертає дані
    
    def test_delete(self):
        query = "DELETE FROM sport"
        self.cursor.execute(query)
        self.conn.commit()
        self.cursor.execute("SELECT * FROM sport")
        result = self.cursor.fetchall()
        self.assertEqual(result, [])  # Очікуємо, що після видалення записів не залишиться
    
    def test_update(self):
        query = "UPDATE sport SET Name = 'Updated' WHERE ID = 1"
        self.cursor.execute(query)
        self.conn.commit()
        self.cursor.execute(query)
        result = self.cursor.fetchone()
        self.assertEqual(result[0], 'Updated')
    
    def test_read(self):
        query = "SELECT * FROM sport"
        df = pd.read_sql_query(query, self.conn)
        self.assertFalse(df.empty)  # Перевіряємо, що таблиця не пуста

if __name__ == "__main__":
    output_dir = os.path.join(os.getcwd(), "test-reports")
    os.makedirs(output_dir, exist_ok=True)
    with open(os.path.join(output_dir, "results.xml"), "wb") as output:
        unittest.main(testRunner=xmlrunner.XMLTestRunner(output=output), failfast=False, buffer=False, catchbreak=False)
