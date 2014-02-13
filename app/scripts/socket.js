/*global fsrealtime, Backbone, JST*/

(function () {
    'use strict';

    fsrealtime.Protocol = function(message){

        var obj = {};

        obj.level = parseInt(message['Log-Level']);
        obj.loglines = message['_body'].split('\n');

        return obj;
    };

    fsrealtime.Socket = function(){
        var socket = undefined;
        var host = "ws://"+document.location.host+"/websocket";

        function onopen() {
            // console.log('I am connected!');
        };

        function onclose() {
            // console.log('Connection was closed.');
        };

        function onmessage(msg) {
            var message = jQuery.parseJSON(msg.data);
            var model = new fsrealtime.Protocol(message);
            fsrealtime.logs.set(model);
        };

        /*
            Bind callbacks from socket to the class methods
        */
        function bind() {
            socket.onopen = onopen;
            socket.onclose = onclose;
            socket.onmessage = onmessage;
        };

        return {
            connect: function() {
                if (socket === undefined) {
                    socket = new WebSocket(host);
                    bind();
                } else {

                }
            },
            close: function() {
                if (socket !== undefined) {
                    socket.close();
                }
            }
        }
    };

    fsrealtime.socket = new fsrealtime.Socket();
    fsrealtime.socket.connect();

}());
