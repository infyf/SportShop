import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Goods.db')
query = "SELECT  ID, Name, Address of factory from sport" 
data = pand.read_sql_query(query, conn)
def select():
    query = "SELECT * FROM goods"
    return query

def delete(): 
    query = "DELETE * from goods" 
    return query
def update(): 
    query = "UPDATE * from goods" 
    return query
def read(): 
    query = "UPDATE * from goods" 
    return query 
conn.close()
print(data)
