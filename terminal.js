define(['jquery', 'command_processor', 'screen'], function ($, command, screen) {

    var Terminal = function () {
        this.input  = $('#input');
    };

    Terminal.prototype = {
        
        init: function () {
            this.setSizeAndFocusCursor();
            this.listenForEvents();
            this.welcome();
        },

        setSizeAndFocusCursor: function () {
            var windowHeight = $(window).height(),
                maxHeight = (windowHeight - this.input.height() - 50) + 'px';

            $('.terminal').height(windowHeight);
            screen.setHeight(maxHeight);
            this.input.focus();
        },

        listenForEvents: function () {

            var terminal = this;

            $('.terminal').on('click', function () {
                terminal.input.focus();
            });

            $('form').on('submit', function (e) {
                terminal.processCommand();
                e.preventDefault();
                return false;
            });
        },

        processCommand: function () {
            var cmd = command.clean(this.input.val());
            this.input.val('');
            screen.stdout('$ ' + cmd);
            command.process(cmd, function () {
                screen.prompt();
            });
        },

        welcome: function () {
            screen.stdout("Welcome to Chris Ashton's terminal.");
            screen.stdout("Don't know where to begin? Try typing `help` into the terminal, then hit Return.");
            screen.stdout("===================================");
            screen.prompt();
        }
    };

    return new Terminal();
});