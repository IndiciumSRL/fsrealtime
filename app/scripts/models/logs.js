/*global fsrealtime, Backbone*/

fsrealtime.Models = fsrealtime.Models || {};

(function () {
    'use strict';

    fsrealtime.Models.LogsModel = Backbone.Model.extend({

        url: '',

        initialize: function() {
        },

        defaults: {
            level: 0,
            logline: ''
        },

        validate: function(attrs, options) {
        },

        parse: function(response, options)  {
            return response;
        }
    });

    fsrealtime.Models.LogsModel.prototype.sync = function() { return null; };
    fsrealtime.Models.LogsModel.prototype.fetch = function() { return null; };
    fsrealtime.Models.LogsModel.prototype.save = function() { return null; };

})();