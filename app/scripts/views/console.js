/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ConsoleView = Backbone.View.extend({

        template: JST['app/scripts/templates/console.ejs'],
        el: 'div.content .col-xs-11',
        levels: ['console', 'aler', 'crit', 'err', 'warning', 'notice', 'info', 'debug'],

        initialize: function() {
        	this.render();

        	this.listenTo(fsrealtime.logs, 'add', this.addLogLine);
        },
        render: function() {
        	this.$el.html(this.template());
        	return this;
        },
        addLogLine: function(log) {
        	var logview = new fsrealtime.Views.LogView({model: log});
        	this.$('div.console').append(logview.render().$el);
        }

    });

})();
