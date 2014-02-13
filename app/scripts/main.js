/*global fsrealtime, $*/


window.fsrealtime = {
    Models: {},
    Collections: {},
    Views: {},
    Routers: {},
    init: function () {
        'use strict';
        Backbone.history.start();
    }
};

$(document).ready(function () {
    'use strict';
    fsrealtime.init();
});
