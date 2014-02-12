/*global fsrealtime, Backbone*/

fsrealtime.Collections = fsrealtime.Collections || {};

(function () {
    'use strict';

    fsrealtime.Collections.LogsCollection = Backbone.Collection.extend({

        model: fsrealtime.Models.LogsModel,
        initialize: function() {
        }

    });

    fsrealtime.logs = new fsrealtime.Collections.LogsCollection();

})();
