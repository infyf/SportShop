import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Wishlist.db')
query = "SELECT  ID, Name, Choosing  from wishlist" 
data = pand.read_sql_query(query, conn)
def select():
    query = "SELECT * FROM wishlist"
    return query

def delete(): 
    query = "DELETE * from wishlist" 
    return query
def update(): 
    query = "UPDATE * from wishlist" 
    return query
def read(): 
    query = "UPDATE * from wishlist" 
    return query 
conn.close()
print(data)
