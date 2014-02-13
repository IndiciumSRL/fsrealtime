/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ConsoleView = Backbone.View.extend({

        template: JST['app/scripts/templates/console.ejs'],
        events : {
        	'keypress input[type=text]': 'keypress'
        },

        initialize: function() {
        	$(window).on("resize", this.resolveFullHeight);
        	this.render();
            this.fsconsole = this.$('div.console');
        	this.listenTo(fsrealtime.logs, 'add', this.addLogLine);
        },
        render: function() {
        	this.$el.html(this.template( {'server': this.server} ));
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
        },
        resolveFullHeight : function() {
            var newHeight = $("html").height() - $(".header").height() - $(".footer").height() - 38 - 55 - 75 + "px";
            $("div.console").css("height", newHeight);
        },
        keypress: function(event) {
        	var key = event.keyCode || event.which;

        	if (key === 13) {
        		var command = $(event.target).val();
        		event.preventDefault();
        		// fsrealtime.logs.create({loglines: [command]});
        		fsrealtime.commands.execute(command);
        		$(event.target).val('');
        	}
        }

    });

})();
