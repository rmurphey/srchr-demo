// Set the require.js configuration for your application.
require.config({
  // Initialize the application with the main application file
  deps: [ "foo" ],

  paths: {
    // JavaScript folders
    app: "../../app",
    lib: "../../lib",
    plugins: "../../lib/plugins",

    // Libraries
    jquery: "../lib/jquery",
    can: "../../lib/can",

    // Shim Plugin
    use: "../../lib/plugins/use"
  },

  use: {
    can: {
      deps: [ "jquery" ],
      attach: "can"
    }
  }
});
