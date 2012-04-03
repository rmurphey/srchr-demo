// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: [ "main" ],

  paths: {
    // JavaScript folders
    lib: "../lib",
    plugins: "../lib/plugins",

    // Libraries
    jquery: "../lib/jquery",
    underscore: "../lib/underscore",
    backbone: "../lib/backbone",

    // Shim Plugin
    use: "../lib/plugins/use"
  },

  use: {
    backbone: {
      deps: [ "use!underscore", "jquery" ],
      attach: "Backbone"
    },

    underscore: {
      attach: "_"
    }
  }
});
