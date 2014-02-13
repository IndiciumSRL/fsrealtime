/*global fsrealtime, Backbone*/

fsrealtime.Models = fsrealtime.Models || {};

(function () {
    'use strict';

    fsrealtime.Models.LogsModel = Backbone.Model.extend({

        initialize: function() {
        },

        defaults: {
            level: 0,
            loglines: [],
            uuid: ''
        },

    });

})();
