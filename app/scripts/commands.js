/*global fsrealtime, Backbone, JST*/

(function () {
    'use strict';

    fsrealtime.CommandRegistry = {
    	registry : {
    		log: function(args) {
    			var level = args[1];
    			this.executeDefault(args);
    		}
    	},
    	executeDefault : function(args) {
    		fsrealtime.logs.set({loglines: [args.join(" ")]})
    		this.trigger('commands:executed', args.join(" "));

    	},
    	execute : function(command) {
    		var args = command.split(' ');
    		var that = this;
    		var f = this.registry;

    		args.every(function(arg){
    			var gotten = f[arg];
    			if ( typeof gotten === 'object' ) {
    				f = gotten;
    				return true;
    			} else {
    				if (gotten === undefined && f === that.registry) {
    					that.executeDefault.apply(that, [args]);
    					return false;
    				}
    				gotten.apply(that, [args]);
    				return false;
    			}
    		});
    	}
    };

    _.extend(fsrealtime.CommandRegistry, Backbone.Events);
    fsrealtime.commands = Object.create(fsrealtime.CommandRegistry);

}());
