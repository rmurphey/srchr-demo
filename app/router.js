define([
  'use!backbone',
  'controllers'
], function(B, C) {
  var currentPage;

  var Router = B.Router.extend({
    routes : {
      '' :              'search',
      'search/:term' :  'search',
      'empty' :         'empty'
    },

    search : function(term) {
      if (!currentPage || currentPage.name !== 'search') {
        currentPage = C.search(term);
      } else {
        currentPage.update({ term : term });
      }
    },

    empty : function() {
      if (currentPage && currentPage.destroy) {
        currentPage.destroy();
      }
    }
  });

  return Router;
});
