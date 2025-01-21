import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\SportThings.db')
query = "SELECT  Name, Price, Size from sport" 
data = pand.read_sql_query(query, conn)
conn.close()
print(data)
