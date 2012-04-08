require([
  'use!backbone',
  'jquery',
  'controllers'
], function(B, $, C) {
  var currentPage;

  var Router = B.Router.extend({
    routes : {
      '' : 'search',
      'search/:term' : 'search',
      'favorites' : 'favorites'
    },

    search : function(term) {
      if (!currentPage || currentPage.controller !== 'Search') {
        currentPage = C.Search(term);
      } else {
        currentPage.update({ term : term });
      }
    },

    favorites : function(hash) {

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
