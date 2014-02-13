/*global fsrealtime, Backbone*/

fsrealtime.Collections = fsrealtime.Collections || {};

(function () {
    'use strict';

    fsrealtime.Collections.ServersCollection = Backbone.Collection.extend({

        model: fsrealtime.Models.ServersModel,
        url: '/api/servers',
        initialize: function() {
        },

    });

})();
