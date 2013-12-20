'use strict';

var FSRT = window.FSRT || {};

$(function(){
	FSRT.websocket.connect();
	$('div.cli').liveConsole({
			send:'button#run_api',
			field: 'input',
			socket : FSRT.websocket
		});
});