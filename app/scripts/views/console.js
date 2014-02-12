/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ConsoleView = Backbone.View.extend({

        template: JST['app/scripts/templates/console.ejs'],
        el: 'div.content .col-xs-11',
        levels: ['console', 'aler', 'crit', 'err', 'warning', 'notice', 'info', 'debug'],
        currentLevel : 7,

        initialize: function() {
        	this.render();
        },
        render: function() {
        	this.$el.html(this.template());
        	return this;
        },
        addLogLine: function(logline) {
        	var $span = $('<span/>').html(logline.log).addClass(this.levels[logline.level]);
        	this.$('div.console').append($span);
        },
        setLevel: function(level) {
        	this.currentLevel = level;
        }

    });

})();
