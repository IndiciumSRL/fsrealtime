/*global fsrealtime, $*/


window.fsrealtime = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        this.console = new fsrealtime.Views.ConsoleView();
        this.console.resolveFullHeight();
    }
};

$(document).ready(function () {
    'use strict';
    fsrealtime.init();
});
