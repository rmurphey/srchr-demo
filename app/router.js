define([
  'use!backbone',
  'controllers'
], function(B, C) {
  var currentPage;

  var Router = B.Router.extend({
    routes : {
      '' :              'search',
      'search/:term' :  'search'
    },

    search : function(term) {
      if (!currentPage || currentPage.controller !== 'search') {
        currentPage = C.search(term);
      } else {
        currentPage.update({ term : term });
      }
    }
  });

  return Router;
});
