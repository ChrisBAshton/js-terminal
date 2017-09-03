define(['jquery', 'screen', 'command_history'], function ($, screen, history) {

    var CommandProcessor = function () {

        this.processingCommand = false;

        // NB: functions beginning with cmd_ are real BASH commands
        this.validCommands = {
            'cat':          'cmd_more',
            'cd':           'cmd_cd',
            'clear':        'cmd_clear',
            'finger':       'cmd_finger',
            'grep':         'cmd_grep',
            'head':         'cmd_more',
            'history':      'cmd_history',
            'less':         'cmd_more',
            'ls':           'cmd_ls',
            'man':          'cmd_man',
            'more':         'cmd_more',
            'pwd':          'cmd_pwd',
            'rm':           'cmd_rm',
            'sudo':         'cmd_sudo',
            'tail':         'cmd_more',
            'download':     'download',
            'hello':        'hello',
            'hi':           'hello',
            'wassup':       'hello',
            'help':         'help'
        };
    };

    CommandProcessor.prototype = {

        init: function (output, input) {
            this.output = output;
            this.input = input;
            history.init(this.input);
        },

        clean: function (command) {
            command = command.replace(/</g, '&lt;');
            command = command.replace(/>/g, '&gt;');
            command = command.replace(/"/g, '');
            command = command.replace(/'/g, "");
            return command;
        },

        process: function (command, callback) {
            var firstPartOfCommand = command.substr(0, command.indexOf(' ')) || command,
                commandArguments   = command.replace(firstPartOfCommand, '').trim();
                functionToCall     = this.validCommands[firstPartOfCommand];

            history.log(command);

            if (typeof functionToCall === 'undefined') {
                screen.stderr('-bash: '+ command +': command not found');
            } else {
                eval('this.' + functionToCall + '("' + commandArguments + '")');
            }

            this.performCallbackWhenReady(callback);
        },

        performCallbackWhenReady: function (callback) {
            var processor = this;
            if (processor.processingCommand === true) {
                setTimeout(function () {
                    processor.performCallbackWhenReady(callback);
                }, 50);
            } else {
                callback();
            }
        },

        dotdotdot: function (line, numberOfDots) {
            var self = this;

            if (numberOfDots > 0) {
                setTimeout(function () {
                    line.html(line.html() + '.');
                    numberOfDots--;
                    self.dotdotdot(line, numberOfDots);
                }, 50);
            } else {
                line.html(line.html() + ' 100%. <br /> <br /> ...just kidding.');
                this.processingCommand = false;
            }
        },

        cmd_cd: function (args) {
            var firstChar = args.length > 0 ? args.charAt(0):'';
            var baseUrl = "//ashton.codes";

            // @TODO - doesn't seem to work properly
            if (
                args      === '..' ||
                firstChar === ''   ||
                firstChar === '/'  ||
                firstChar === '.'  ||
                firstChar === '~'
                ) {
                window.location.href = baseUrl;
            }

            window.location.href = baseUrl + '/' + args;
        },

        cmd_clear: function (args) {
            screen.clear();
        },

        cmd_finger: function (args) {
            screen.stdout("We'll have none of that in MY terminal! Leave '" + args + "' alone!");
        },

        cmd_grep: function (args) {
            screen.stdout("Nobody really knows how to use `grep` properly. Let's not kid ourselves.");
        },

        cmd_history: function (args) {
            if (args === '-c') {
                history.clear();
            } else {
                var commands = history.get();
                for (var i = 0; i < commands.length; i++) {
                    var commandNumber = i + 1;
                    screen.stdout(commandNumber + ' ' + commands[i]);
                }
            }
        },

        cmd_ls: function (args) {
            if (args === '/usr/bin/local') {
                var listOfCommands = "<ul class='terminal__list'>";

                for (var key in this.validCommands) {
                    listOfCommands = listOfCommands + '<li>' + key + '</li>';
                }

                listOfCommands = listOfCommands + '</ul>';

                screen.stdout(listOfCommands);
            } else {
                screen.stdout("<ul class='terminal__list'><li>about</li><li>blog</li><li>portfolio</li><li>contact</li></ul>");
            }
        },

        cmd_more: function (filename) {
            var descriptions = {
                "about":     "Find out more about Chris Ashton.",
                "blog":      "Read some of my thoughts, tech-related or otherwise.",
                "portfolio": "See some of my lovely websites and applications.",
                "contact":   "Send me a message!"
            };

            if (typeof descriptions[filename] !== 'undefined') {
                screen.stdout(descriptions[filename]);
            } else {
                screen.stderr('Invalid file specified!');
            }
        },

        cmd_man: function (command) {
            screen.stdout("There is no man page for `" + command + "` (or for any other command, for that matter). Try `help` if you're stuck.");
        },

        cmd_pwd: function () {
            screen.stdout("/follow/the/yellow/brick/road/");
        },

        cmd_rm: function (args) {
            this.processingCommand = true;
            screen.stdout("Trying to sabotage my site, eh?");
            screen.stdout("Downloading virus");
            writeOnSameLine = this.output.find('.terminal__output').last();
            this.dotdotdot(writeOnSameLine, 10);
        },

        cmd_sudo: function (args) {
            screen.stdout("You are a guest user. No sudo for you.");
        },

        download: function (args) {
            this.processingCommand = true;
            screen.stdout("Downloading 3.4Gb of awesomeness");
            writeOnSameLine = this.output.find('.terminal__output').last();
            this.dotdotdot(writeOnSameLine, 100);
        },

        hello: function (args) {
            screen.stdout('Right back at you!');
        },

        help: function () {
            screen.stdout("If you've never used the command line before, this will be quite alien to you. I suggest you type `cd ..` ('Change Directory to parent directory'), which will redirect you back to the homepage, or you can simply press the back button in your browser.");
            screen.stdout("If you're comfortable with the UNIX command line, then go ahead and have a play around. If you're stuck, you can see all possible system commands by typing `ls /usr/bin/local`");
        }
    };

    return new CommandProcessor();
});
