define(['jquery'], function ($) {

    var CommandHistory = function () {
        this.lastCommand = 0;
        this.history = [];
        var self = this;

        // @TODO - add event listener on input element, not on entire window.
        // http://stackoverflow.com/questions/1314450/jquery-how-to-capture-the-tab-keypress-within-a-textbox
        window.onkeyup = function (e) {
            var key         = e.keyCode ? e.keyCode : e.which,
                upPressed   = key == 38,
                downPressed = key == 40;

            if (upPressed) {
                self.lastCommand--;
            } else if (downPressed) {
                self.lastCommand++;
            }

            if (upPressed || downPressed) {
                self.populateInput();
            }
        }
    };

    CommandHistory.prototype = {

        init: function (input) {
            this.input = input;
        },

        log: function (command) {
            this.history.push(command);
            this.lastCommand = this.history.length;
        },

        clear: function () {
            this.history = [];
        },

        get: function () {
            return this.history;
        },

        populateInput: function () {
            if (this.history.length > 0) {
                this.validateLastCommandIndex();
                this.input.val(this.history[this.lastCommand]);
            }
        },

        validateLastCommandIndex: function () {
            var minIndex = 0,
                maxIndex = this.history.length - 1;

            this.lastCommand = (this.lastCommand > maxIndex) ? maxIndex : this.lastCommand;
            this.lastCommand = (this.lastCommand < minIndex) ? minIndex : this.lastCommand;
        }
    }

    return new CommandHistory();
});
