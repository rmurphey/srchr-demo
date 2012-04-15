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

  $(document).on('click', 'a', function(e) {
    var href = $(this).attr('href'),
        protocol = this.protocol + '//';

    if (href && href.slice(0, protocol.length) !== protocol) {
      e.preventDefault();
      app.router.navigate(href, true);
    }
  });

});
