import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\RegistrationDB.db')
query = "SELECT  ID, Name, Email, Password  from registration" 
data = pand.read_sql_query(query, conn)
def select():
    query = "SELECT * FROM registration"
    return query

def delete(): 
    query = "DELETE * from registration" 
    return query
def update(): 
    query = "UPDATE * from registration" 
    return query
def read(): 
    query = "UPDATE * from registration" 
    return query 
conn.close()
print(data)
