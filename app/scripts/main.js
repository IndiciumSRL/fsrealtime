/*global fsrealtime, $*/


window.fsrealtime = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        console.log('Hello from Backbone!');
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
        $(".console").css("height", newHeight);
    }
    resolveFullHeight();
});
