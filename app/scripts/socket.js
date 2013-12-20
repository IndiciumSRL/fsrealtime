'use strict';

var FSRT = window.FSRT || {};

// The module pattern
FSRT.websocket = (function() {
 
    // private variables and functions
    var socket;
    var reconnect = false;
    var host = 'ws://'+document.location.hostname+':5000/websocket';
 
    var connect = function() {
        reconnect = true;
        socket = new WebSocket(host);

        socket.onopen = function() {
            console.log('Opnened the connection.');
        };

        socket.onmessage = function(msg) {
            
            var data = jQuery.parseJSON(msg.data);

            $.event.trigger({
                type: 'newLog',
                message: data
            });

        };

        socket.onclose = function() {
            console.log('Connection closed.');
        };
    };

    var close = function() {
        reconnect = false;
        socket.close();
    };

    var send = function(s) {
        console.log(s);
        socket.send(s);
    };
 
    // public API
    return {
        connect: connect,
        close: close,
        send: send
    };
 
})();