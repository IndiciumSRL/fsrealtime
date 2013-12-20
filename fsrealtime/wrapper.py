import logging
import threading
import time
import json

import ESL
from . import ws_list

log = logging.getLogger(__name__)

__all__ = ['getWrapper', 'setWrapper']

class _ESLWrapper(threading.Thread):
    """
    This class is an ESLWrapper that is used for controlling `FreeSWITCH`.
    We will react to events received here, treat them and notify the cloud of them.
    """
    def __init__(self, host='localhost', port='8021', password = 'ClueCon'):
        super(_ESLWrapper, self).__init__()
        self.host = host
        self.port = port
        self.password = password
        self._keep_running = False
        self._sock = None


    def _connect(self):
        '''
            This will connect to ESL
        '''
        self._keep_running = True
        while self._keep_running:
            self._sock = ESL.ESLconnection(self.host, self.port, self.password)
            if not self._sock.connected():
                log.debug('Should we progress the amount of time we retry?')
                continue

            # self._sock.events('plain', 'all')
            self._sock.send('log 7');
            log.debug('Connected')
            return
        log.debug('We were stopped while trying to connect.')


    def run(self):
        '''
            Main loop that receives and treats events
        '''
        self._connect()
        while self._keep_running:
            if not self._sock.connected():
                self._connect()
                if not self._keep_running: break

            ev = self._sock.recvEventTimed(2000)
            if ev is None:
                continue

            dict_ev = json.loads(ev.serialize('json'))

            log.debug('Received event: %s (%s).', dict_ev.get('Event-Name'), dict_ev.get('Event-Subclass'))

            for ws in ws_list:
                ws.send(ev.serialize('json'))

        log.debug('Stopped the thread.')


    def api(self, command, args, ws):
        '''
            Run API commands and return its event.
            TODO: A proxy should be pretty cool here sometime.
        '''
        log.debug('Entered here...')
        ev = self._sock.api(str(command), str(args))
        log.debug(ev.serialize('json'))
        ws.send(ev.serialize('json'))
        return ev

    
    def stop(self):
        self._keep_running = False
        log.debug('Stopping the wrapper thread.')


_esl_wrapper = None

def setWrapper(host='localhost', port='8021', password = 'ClueCon'):
    global _esl_wrapper
    _esl_wrapper = _ESLWrapper(host, port, password)
    return _esl_wrapper

def getWrapper():
    global _esl_wrapper
    return _esl_wrapper