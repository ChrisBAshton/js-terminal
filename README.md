# JS-Terminal
A terminal emulator, built in JavaScript. See a working example at [http://ashton.codes/terminal/](http://ashton.codes/terminal/).

# Dependencies
* jQuery (tested with v2.0.3)
* RequireJS (tested with v2.1.8)

# Usage
See test.html for implementation.

# Contribute
I admit that this is pretty hard-coded for my own purposes, which is to make my site nerdy at http://ashton.codes/terminal/. I've put it on Git because, well, Git is great and this sort of thing should be in version control.

I'd be happy to accept a pull request to make the terminal emulator more extensible/abstract/generic. In an ideal world, the following still needs to be done:

* remove dependency on RequireJS
* remove dependency on jQuery
* remove legacy markup (i.e. `font color=""`)
* pass selectors to `init`, rather than forcing specific HTML markup