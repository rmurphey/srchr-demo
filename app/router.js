define([
  'use!backbone',
  'controllers/search'
], function(B, Search) {
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
        currentPage = Search();
      }

      currentPage.update({ term : term });
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
