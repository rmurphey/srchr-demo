define([
  'use!backbone',
  'data/search',
  'collections/searches'
], function(B, SearchData, Searches) {
  var searches = new Searches(JSON.parse(window.localStorage.getItem('searches')));
  searches.on('add remove', searches.store);

  return {
    searches : searches,
    searchData : new SearchData(),
    currentSearch : new Backbone.Model({ term : null })
  };
});
