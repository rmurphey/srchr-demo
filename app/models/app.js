define([
  'use!backbone',
  'data/search',
  'collections/searches'
], function(B, SearchData, Searches) {
  var searches = new Searches(JSON.parse(window.localStorage.getItem('searches'))),
      app = {
        searchData : new SearchData(),
        searches : searches
      };

  return app;
});
