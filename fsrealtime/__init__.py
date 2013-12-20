import logging

from flask import Flask
from flask_sockets import Sockets
from geventwebsocket.websocket import WebSocketError

logging.basicConfig(level=logging.DEBUG)

ws_list = []

import wrapper
esl = wrapper.setWrapper('192.168.200.195')
esl.start()

log = logging.getLogger(__name__)

app = Flask(__name__)
sockets = Sockets(app)

@sockets.route('/websocket')
def websocket(ws):
    ws_list.append(ws)
    while True:
    	try:
        	message = ws.receive()
        	if message is None:
        		ws_list.remove(ws)
        		return
        	smessage = message.split()
        	esl.api(smessage[0], ' '.join(smessage[1:]), ws)
        except WebSocketError:
    		ws_list.remove(ws)

@app.route('/')
def hello():
    return 'Hello World!'