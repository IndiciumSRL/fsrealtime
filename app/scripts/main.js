/*global fsrealtime, $*/


window.fsrealtime = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        fsrealtime.console = new fsrealtime.Views.ConsoleView();
        fsrealtime.console.addLogLine({log: 'Test', level: 0});
    }
};

$(document).ready(function () {
    'use strict';
    fsrealtime.init();
    
    $(window).resize(function () {
        resolveFullHeight();
    });

    //Dynamically assign height
    function resolveFullHeight() {
        var newHeight = $("html").height() - $(".header").height() - $(".footer").height() - 38 - 55 - 75 + "px";
        $("div.console").css("height", newHeight);
    }
    resolveFullHeight();
});
