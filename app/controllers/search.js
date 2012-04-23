define([
  'models/app',
  'views/results',
  'views/searchForm',
  'views/recentSearches'
], function(app, ResultsView, SearchFormView, RecentSearchesView) {
  return function(term) {
    var searchForm =  new SearchFormView({}).render(),

        results =     new ResultsView({
                        searchData : app.get('searchData')
                      }).render(),

        recent =      new RecentSearchesView({
                        searches : app.get('searches'),
                        currentSearch : function() {
                          return app.get('currentSearch');
                        }
                      }).render();

    searchForm.placeAt('#mainbar');
    results.placeAt('#mainbar');
    recent.placeAt('#sidebar');

    searchForm.on('search', update);
    update(term);

    function update(t) {
      if (!t) { return; }

      app.set('currentSearch', t);

      var searches =      app.get('searches'),
          searchData =    app.get('searchData'),
          existing =      searches.where({ term : t }),
          time =          new Date().getTime();

      if (existing.length) {
        existing[0].set('time', time);
      } else {
        searches.add({ term : t, time : time });
      }

      searchData.fetch({ data : { term : t } });
    }

    return {
      controller : 'search',
      update : function(params) {
        return update(params.term);
      }
    };
  };
});
