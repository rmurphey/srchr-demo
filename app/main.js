require([
  'use!backbone',
  'jquery',
  'router',
  'models/app'
], function(B, $, Router, app) {
  $(function() {
    app.router = new Router();
    B.history.start();
  });
});
