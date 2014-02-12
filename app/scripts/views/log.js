/*global fsrealtime, Backbone, JST*/

fsrealtime.Views = fsrealtime.Views || {};

(function () {
    'use strict';

    fsrealtime.Views.LogView = Backbone.View.extend({

        template: JST['app/scripts/templates/log.ejs'],
        initialize: function() {
            this.levels = ['console', 'aler', 'crit', 'err', 'warning', 'notice', 'info', 'debug'];

        },
        render: function() {
        	this.$el.html(this.template( {loglines: this.model.get('loglines'), level: this.levels[this.model.get('level')] } ));
        	return this;
        }

    });

})();
