define([
  'use!backbone',
  'collections/searchData',
  'collections/searches'
], function(B, SearchData, Searches) {
  var searches = new Searches(),
      app = new B.Model({
        searchData : new SearchData(),
        searches : searches,
        currentSearch : null
      });

  return app;
});
