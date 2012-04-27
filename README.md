# Srchr

This app searches Flickr and Youtube for content based an a search term entered
by a user. It is intended as a demo of techniques for building client-side
apps. It uses a variety of technologies, including:

- [Node](http://nodejs.org/) for the server
- [Twitter Bootstrap](http://twitter.github.com/bootstrap/) for the UI
- [Backbone](http://documentcloud.github.com/backbone/) for the client
- [Mocha](http://visionmedia.github.com/mocha/) and [expect.js](https://github.com/LearnBoost/expect.js/blob/master/README.md) for tests

## Running the app

1. Install node. [Homebrew](http://mxcl.github.com/homebrew/) is your best bet: `brew install node`.
2. Run `npm install` from the root directory of this project to load the dependencies.
3. Copy `server/config.js.example` to `server/config.js` and update with your
   API key(s) if you'd like. Currently, only the Youtube search will work without a key.
4. To run the development server: `node bin/dev`
5. [Visit the app in your browser](http://localhost:4444).

## Running the tests

When the development server is running, you can [run the tests here](http://localhost:4444/_test).

## Building the app

You will need to have RequireJS installed:

    npm install -g requirejs

Then, from the root of the project, run the following commands:

    r.js -o srchr.build.js
    r.js -o cssIn=assets/css/srchr.css out=prod/assets/css/srchr.css

You can run the built version of the app by running:

    node bin/server

## TODOs

- Make it possible to favorite items
- Make it possible to tag favorites
- Incorporate other content sources
- Use [grunt](https://github.com/cowboy/grunt)
