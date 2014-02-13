/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.ServerselectView = Backbone.View.extend({

        template: JST['app/scripts/templates/ServerSelect.ejs'],
        events : {
        	'click button': 'serverSelected'
        },
        initialize: function() {
        	var that = this;
        	this.servers = new fsrealtime.Collections.ServersCollection();
        	this.servers.fetch({success: function() {
        		that.render();
        	}});
        },
        render: function() {
        	this.template({servers: this.servers.toJSON()});
            return this;
        },
        serverSelected : function() {
        	var server = this.$('select>option:selected').val();
        	fsrealtime.router.navigate(server, {trigger: true});
        }

    });

})();
