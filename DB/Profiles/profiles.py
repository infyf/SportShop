import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Profiles.db')
query = "SELECT  ID, Name, emailAddress  from profiles" 
data = pand.read_sql_query(query, conn)
def select():
    query = "SELECT * FROM profile"
    return query

def delete(): 
    query = "DELETE * from profile" 
    return query
def update(): 
    query = "UPDATE * from profile" 
    return query
def read(): 
    query = "UPDATE * from profile" 
    return query 
conn.close()
print(data)
