/*global fsrealtime, Backbone*/

fsrealtime.Routers = fsrealtime.Routers || {};

(function () {
    'use strict';

    fsrealtime.Routers.RouterRouter = Backbone.Router.extend({
    	routes: {
    		'' : 'index',
    		':server' : 'showServer'
    	},
    	
    	index: function() {
    		this.swapView(fsrealtime.Views.ServerselectView);
    	},

    	showServer: function(server) {
            this.swapView(fsrealtime.Views.ConsoleView, {server: server});
    	},

    	swapView : function(newView, options) {
    		if (this.current_view) {
    			this.current_view.remove();
    		}
			this.current_view = new newView(options || {});
            $('div.content').html(this.current_view.el);
    		// this.current_view.render();
    	}


    });

    fsrealtime.router = new fsrealtime.Routers.RouterRouter();
})();
