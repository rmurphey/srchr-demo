define([
  'use!backbone',
  'data/search',
  'models/search',
  'collections/searches'
], function(B, SearchData, Search, Searches) {
  var searches = new Searches(),
      app = new B.Model({
        searchData : new SearchData(),
        searches : searches,
        currentSearch : null
      });

  return app;
});
