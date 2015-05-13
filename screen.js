define(['jquery'], function ($) {

    var Screen = function () {
        this.output = $('#output');
    };

    Screen.prototype = {

        outputToTerminal: function (type, contents) {
            this.output.append('<p class="' + type +'">' + contents + '</p>');
        },

        stdout: function (output) {
            this.outputToTerminal('terminal__output', output);
        },

        stderr: function (output) {
            this.outputToTerminal('terminal__error', output);
        },

        prompt: function () {
            var prompt = '<font color="lime">guest</font> in <font color="yellow">/</font>';
            this.outputToTerminal('terminal__prompt', prompt);
            this.scrollToCursor();
        },

        scrollToCursor: function () {
            var output = this.output[0];
            // need to setTimeout to allow time for the dom appending elements
            setTimeout(function () {
                output.scrollTop = output.scrollHeight;
            }, 1);
        },

        setHeight: function (height) {
            this.output.css('max-height', height);
        },

        clear: function () {
            this.output.html('');
        }
    };

    return new Screen();
});