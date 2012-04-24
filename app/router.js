define([
  'use!backbone',
  'controllers'
], function(B, C) {
  function cleanup() {
    if (currentPage && currentPage.destroy) {
      currentPage.destroy();
    }
  }

  var currentPage;

  var Router = B.Router.extend({
    routes : {
      '' :              'search',
      'search/:term' :  'search',
      'empty' :         'empty'
    },

    search : function(term) {
      if (!currentPage || currentPage.name !== 'search') {
        cleanup();
        currentPage = C.search(term);
      } else {
        currentPage.update({ term : term });
      }
    },

    empty : function() {
      cleanup();

      currentPage = {
        destroy : function() { }
      };
    }
  });

  return Router;
});
