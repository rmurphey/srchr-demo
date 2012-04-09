This is a sample app that uses a variety of technologies to demonstrate
concepts behind building client-side applications.


# The technologies

- [Node](http://nodejs.org/) for the server
- [Twitter Bootstrap](http://twitter.github.com/bootstrap/) for the UI
- [Backbone](http://documentcloud.github.com/backbone/) for the client
- [Mocha](http://visionmedia.github.com/mocha/) for tests

# Running the app

1. Install node. [Homebrew](http://mxcl.github.com/homebrew/) is your best bet: `brew install node`.
2. Install [npm](http://npmjs.org/).
3. Run `npm install` from the root directory of this project to load the dependencies.
4. Copy `server/config.js.example` to `server/config.js` and update with your
   API key(s) if you'd like. Currently, only the Youtube search will work without a key.
5. Run the server using `node bin/server` and [visit the app in your browser](http://localhost:4444).

# Running the tests

When the server is running, you can view the tests [on the server](http://localhost:4444/_test).

# Building the app

You will need to have RequireJS installed:

    npm install -g requirejs

Then, from the root of the project, run the following command:

    r.js -o srchr.build.js
