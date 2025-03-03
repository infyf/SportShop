import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Goods.db')
query = "SELECT  ID, Name, Work from services" 
data = pand.read_sql_query(query, conn)
def select():
    query = "SELECT * FROM services"
    return query

def delete(): 
    query = "DELETE * from services" 
    return query
def update(): 
    query = "UPDATE * from services" 
    return query
def read(): 
    query = "UPDATE * from services" 
    return query 
conn.close()
print(data)
