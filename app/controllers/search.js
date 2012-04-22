define([
  'models/app',
  'ui',
  'views/results',
  'views/searchForm',
  'views/recentSearches'
], function(app, ui, ResultsView, SearchFormView, RecentSearchesView) {
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

    ui.place(searchForm, 'mainbar');
    ui.place(results, 'mainbar');
    ui.place(recent, 'sidebar');

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

      searchData.term = t;
      searchData.fetch();
    }

    return {
      controller : 'search',
      update : function(params) {
        return update(params.term);
      }
    };
  };
});
