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
      app.searches.add({ term : term, time : new Date().getTime() });

      if (!currentPage || currentPage.controller !== 'search') {
        currentPage = C.search(term);
      } else {
        currentPage.update({ term : term });
      }
    },

    favorites : function(hash) {
      // TODO
    }
  });

  $(function() {
    window.Router = Router = new Router();
    B.history.start(/* { pushState : true } */);
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
