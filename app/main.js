require([
  'use!backbone',
  'jquery',
  'controllers',
  'models/app'
], function(B, $, C, app) {
  var currentPage;

  var Router = B.Router.extend({
    routes : {
      '' :              'search',
      'search/:term' :  'search',
      'favorites' :     'favorites'
    },

    search : function(term) {
      if (!currentPage || currentPage.controller !== 'search') {
        currentPage = C.search(term);
      } else {
        currentPage.update({ term : term });
      }
    }
  });

  $(function() {
    window.Router = Router = new Router();
    B.history.start();
  });

  $(document).on('click', 'a', function(e) {
    var href = $(this).attr('href'),
        protocol = this.protocol + '//';

    if (href && href.slice(0, protocol.length) !== protocol) {
      e.preventDefault();
      Router.navigate(href, true);
    }
  });

});
