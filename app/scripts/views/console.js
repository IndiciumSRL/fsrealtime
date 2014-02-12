/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ConsoleView = Backbone.View.extend({

        template: JST['app/scripts/templates/console.ejs'],
        el: 'div.content .col-xs-11',

        initialize: function() {
        	this.render();
            this.fsconsole = this.$('div.console');
        	this.listenTo(fsrealtime.logs, 'add', this.addLogLine);
        },
        render: function() {
        	this.$el.html(this.template());
        	return this;
        },
        addLogLine: function(log) {
        	var logview = new fsrealtime.Views.LogView({model: log});
        	this.fsconsole.append(logview.render().$el);
            this.scrollToBottom();
        },
        scrollToBottom: function() {
            var scrollpos = this.fsconsole.prop('scrollHeight');
            var scrolltop = this.fsconsole.scrollTop();
            if (scrolltop - scrollpos + 1000 > 0) {
                this.fsconsole.scrollTop(scrollpos);
            }
        }

    });

})();
