#Import and create a variables, what needed
import ssl, smtplib  
import socket as sk 
from datetime import datetime
from flask import Flask_WTF 
from flask_limiter import Limiter 
from marshmallow import Schema, fields 
import select
smtp = smtplib.SMTP("http://localhost:3000/", port=3000) 
context = ssl.create_default_context()
smtp.starttls(context=context)   
#Create a client for working and testing 
client_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT) 
client_context.minimum_version = ssl.TLSVersion.TLSv1_1 
client_context.maximum_version = ssl.TLSVersion.TLSv1_3  
hostname = "http://localhost:3000/" 
context = ssl.create_default_context() 
context.load_verify_locations('path/to/cabundle.pem', '/path/to/private.key')
with sk.create_connection((hostname, 443)) as socks:  
    socks.bind(('3000', 8080)) 
    socks.listen(10)
    with context.wrap_socket(sock, server_hostname=hostname) as sockss:  
        connect, addrs1 =sockss.accept()
        print(sockss.version)  
#Create the context
ctx = ssl.create_default_context(Purpose.CLIENT_AUTH)
ctx.verify_flags &= ~ssl.VERIFY_X509_STRICT
time = ssl.cert_time_to_seconds("Jan  5 09:34:43 2018 GMT")  
print(datetime.utcfromtimestamp(time))  
#Work with ssl
ssl.enum_certificates("CA")
ssl.OPENSSL_VERSION 
ssl.OPENSSL_VERSION_INFO 
ssl.OPENSSL_VERSION_NUMBER 
hex(ssl.OPENSSL_VERSION_NUMBER ) 
ctx.cert_store_stats()  
ctx.load_default_certs(purpose=Purpose.SERVER_AUTH) 
ctx1 = ssl.SSLContext(ssl.PROTOCOL_SSLv23)
ctx1.set_ciphers('ECDHE+AESGCM:!ECDSA')  
ctx1.get_ciphers() 
limiter =Limiter(app, key_func=get_db_connection)
limiter.limit("5 per minute")(login_rout)
class UserAuth(Shema):
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=lambda p: len(p) >= 8)
ssl.create_default_context().verify_mode
context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
context.check_hostname = False
context.verify_mode = ssl.CERT_NONE
context.maximum_version = ssl.TLSVersion.TLSv1_2
context.set_ciphers('PSK')

# A simple lambda:
psk = bytes.fromhex('c0ffee')
context.set_psk_client_callback(lambda hint: (None, psk))

# A table using the hint from the server:
psk_table = { 'ServerId_1': bytes.fromhex('c0ffee'),
              'ServerId_2': bytes.fromhex('facade')
}
def callback(hint):
    return 'ClientId_1', psk_table.get(hint, b'')
context.set_psk_client_callback(callback) 

import socket, ssl

context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
context.load_cert_chain(certfile="mycertfile", keyfile="mykeyfile")

bindsocket = socket.socket()
bindsocket.bind(('myaddr.example.com', 10023))
bindsocket.listen(5) 

while True:
    newsocket, fromaddr = bindsocket.accept()
    connstream = context.wrap_socket(newsocket, server_side=True)
    try:
        deal_with_client(connstream)
    finally:
        connstream.shutdown(socket.SHUT_RDWR)
        connstream.close() 

def deal_with_client(connstream):
    data = connstream.recv(1024)
    # empty data means the client is finished with us
    while data:
        if not do_something(connstream, data):
            # we'll assume do_something returns False
            # when we're finished with client
            break
        data = connstream.recv(1024)
    # finished with client
#Cycle "while" with exception handler: 
        while True: 
            try: 
                socks.do_handshake()
            except ssl.SSLWantReadError: 
                select.select([socks], [], []) 
            except ssl.SSLWantWriteError: 
                select.select([], [sockss], [])  
#Create a smtp2 and on od ur site
smtp2 = smtplib.S("http://localhost:3000/", port=3000)
context2 = ssl.create_default_context()
smtp2.starttls(context2=context2) 
#Create a client_context and work with min and max of this 
client_context = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
client_context.minimum_version = ssl.TLSVersion.TLSv1_1 
client_context.maximum_version = ssl.TLSVersion.TLSv1_3 
timest3 =ssl.cert_time_to_seconds("Mar 29 13:49:10 2025 GMT") 
timest3 
print(datetime.utcfromtimestamp(timest3)) 
ssl.enum_certificates("CA") 
try: 
    import ssl 
except ImportError: 
    pass 
context = ssl.create_default_context() 
cont3 = ssl.SSLContext(ssl.PROTOCOL_TLS_CLIENT)
cont3.load_verify_locations("/etc/ssl/certs/ca-bundle.crt")
