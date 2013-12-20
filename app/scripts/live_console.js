'use strict';

(function ( $ ) {
 
    $.fn.liveConsole = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
            field: 'input',
            send:'button#run_api'
        }, options );
 
        var $cli = $(this);
        var $input = $(settings.field);
        var $send = $(settings.send);
        var $socket = settings.socket;
        var logLevels = ['console', 'alert', 'crit', 'err', 'warn', 'notice', 'info', 'debug'];
        var availableUuids = [];
        var hideClasses = [];
        var filteredUuids = [];

        var messageReceived = function(data) {
            var $p = $('<p></p>');
            var uuid = data.message['User-Data'];
            var _class = logLevels[data.message['Log-Level']];
            $p.attr('data-uuid', uuid);
            $p.html(data.message._body);
            $p.addClass(_class);
            
            if ( jQuery.inArray(_class, hideClasses) !== -1 ) {
                $p.hide();
            }
            $cli.append($p);

            if ( uuid && jQuery.inArray(uuid, availableUuids) === -1 ) {
                availableUuids.push(uuid);
            }

            $cli.scrollTop($cli[0].scrollHeight);
        };

        $(document).on('newLog', messageReceived);

        $('select#uuids').change(function() {
            filteredUuids = [];
            var selectors = [];
            $(this).find( 'option:selected' ).each(function() {
                filteredUuids.push($(this).text());
                selectors.push();
            });
        });

        $('input[type="checkbox"]').on('click', function() {
            var checked = $(this).prop('checked');
            var class_ = $(this).val();
            if (checked) {
                hideClasses = jQuery.grep(hideClasses, function(value) {
                    return value !== class_;
                });
            } else {
                hideClasses.push(class_);
            }

            $.each($cli.find('p.'+class_), function() {
                if (checked) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        });

        $send.click(function() {
            $socket.send($input.val());
            $input.val('');
            $input.focus();
        });
        
        return this;
 
    };
 
}( jQuery ));