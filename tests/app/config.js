// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps : [ 'runner' ],

  paths : {
    // JavaScript folders
    test : '.',
    app : '../../app',
    lib : '../../lib',
    plugins : '../../lib/plugins',

    // Libraries
    jquery : '../../lib/jquery',
    underscore : '../../lib/underscore',
    backbone : '../../lib/backbone',

    // Shim Plugin
    use : '../../lib/plugins/use',
    text : '../../lib/plugins/text'
  },

  use : {
    underscore : {
      attach : '_'
    },
    backbone : {
      deps : [ 'use!underscore', 'jquery' ],
      attach  : 'Backbone'
    }
  }
});
