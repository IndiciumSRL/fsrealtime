/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.LogView = Backbone.View.extend({

        template: JST['app/scripts/templates/log.ejs'],
        initialize: function() {

        },
        render: function() {
        	this.$el.html(this.template(this.model.toJSON()));
        	return this;
        }

    });

})();
