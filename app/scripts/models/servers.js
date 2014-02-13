/*global fsrealtime, Backbone*/

fsrealtime.Models = fsrealtime.Models || {};

(function () {
    'use strict';

    fsrealtime.Models.ServersModel = Backbone.Model.extend({

        url: '/api/servers',

        initialize: function() {
        },

        defaults: {
            host: null,
            port : 8021,
            loglevel: 7
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

})();
