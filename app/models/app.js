define([
  'use!backbone',
  'data/search',
  'collections/searches'
], function(B, SearchData, Searches) {
  var searches = new Searches(JSON.parse(window.localStorage.getItem('searches'))),
      currentSearch = new Backbone.Model({ term : null }),
      app = {
        searchData : new SearchData(),
        searches : searches,
        currentSearch : currentSearch
      };

  return app;
});
