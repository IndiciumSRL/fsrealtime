import logging, os

from flask import Flask, url_for, send_from_directory, redirect
from flask_sockets import Sockets
from flask.ext import restful

from geventwebsocket.websocket import WebSocketError

logging.basicConfig(level=logging.DEBUG)

ws_list = []

import wrapper
esl = wrapper.setWrapper('192.168.200.1')
esl.start()

log = logging.getLogger(__name__)

app = Flask(__name__)
sockets = Sockets(app)
api = restful.Api(app)

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
    return redirect(url_for('dev', filename='index.html'))

@app.route('/api/log/<level>', methods=['POST'])
def change_log(level):
    esl.setLogLevel(level)


class Servers(restful.Resource):
    """API to manipulate servers"""
    def get(self):
        ''' List servers '''
        return [{'host': esl.host, 'port': esl.port, 'loglevel': 7}]
        

api.add_resource(Servers, '/api/servers')

# Custom static data
@app.route('/dev/<path:filename>')
def dev(filename):
    static_app = os.path.abspath(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../app'))
    static_tmp = os.path.abspath(os.path.join(os.path.abspath(os.path.dirname(__file__)), '../.tmp'))

    if os.path.isfile( os.path.join(static_tmp, filename) ):
        return send_from_directory(static_tmp, filename)
    else:
        return send_from_directory(static_app, filename)