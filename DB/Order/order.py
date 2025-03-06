import sqlite3
import pandas as pand  
import pytest
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Order.db')
query = "SELECT  ID, Name, Order, Date, Address  from sport" 
data = pand.read_sql_query(query, conn) 
def select():
    query = "SELECT * FROM order"
    return query

def delete(): 
    query = "DELETE  from order" 
    return query
def test_delete(): 
    assert delete()
def update(): 
    query = "UPDATE  from order" 
    return query
def read(): 
    query = "UPDATE  from order" 
    return query 
conn.close() 
if conn == true :
    pytest.delete()
print(data)
