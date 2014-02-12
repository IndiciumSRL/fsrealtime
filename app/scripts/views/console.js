/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ConsoleView = Backbone.View.extend({

        template: JST['app/scripts/templates/console.ejs'],
        el: 'div.content .col-xs-11',

        initialize: function() {
        	this.render();
        },
        render: function() {
        	this.$el.html(this.template());
        	return this;
        }

    });

})();
