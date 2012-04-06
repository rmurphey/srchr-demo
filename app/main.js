require([
  'use!backbone',
  'jquery',

  'controllers'
], function(B, $, controllers) {
  var Router = B.Router.extend({
    routes : {
      '' : 'search',
      'search/:term' : 'search',
      'favorites' : 'favorites'
    },

    search : function(hash) {

    },

    favorites : function(hash) {

    }
  });

  $(function() {
    Router = new Router();
    B.history.start({ pushState : true });
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
