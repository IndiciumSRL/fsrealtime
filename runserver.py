from gevent import pywsgi, sleep
from geventwebsocket.handler import WebSocketHandler

from fsrealtime import app, esl

app.debug = True

server = pywsgi.WSGIServer(("", 5000), app,
    handler_class=WebSocketHandler)

try:
	server.serve_forever()
except KeyboardInterrupt:
	esl.stop()
	esl.join()
	