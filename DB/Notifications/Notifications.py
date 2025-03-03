import sqlite3
import pandas as pand 
# Data about things  
conn = sqlite3.connect('C:\\Users\\user\\Desktop\\DB-Server-sport\\Notifications.db')
query = "SELECT  ID, Name, Notification, Date, Time from sport" 
data = pand.read_sql_query(query, conn) 
def select():
    query = "SELECT * FROM notifications"
    return query

def delete(): 
    query = "DELETE * from notifications" 
    return query
def update(): 
    query = "UPDATE * from notifications" 
    return query
def read(): 
    query = "UPDATE * from notifications" 
    return query 
conn.close()
print(data)
