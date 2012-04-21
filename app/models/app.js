define([
  'use!backbone',
  'data/search',
  'models/search',
  'collections/searches'
], function(B, SearchData, Search, Searches) {
  var searches = new Searches(JSON.parse(window.localStorage.getItem('searches'))),
      app = new B.Model({
        searchData : new SearchData(),
        searches : searches,
        currentSearch : null
      });

  return app;
});
