define([
  'models/app',
  'ui',
  'components/results',
  'components/searchForm',
  'components/recentSearches'
], function(app, ui, ResultsComponent, SearchFormComponent, RecentSearchesComponent) {
  return function(term) {
    var sf =        new SearchFormComponent({
                    }).render(),

        results =   new ResultsComponent({
                      searchData : app.searchData
                    }).render(),

        recent =    new RecentSearchesComponent({
                      searches : app.searches
                    }).render();

    ui.place(sf, 'mainbar');
    ui.place(results, 'mainbar');
    ui.place(recent, 'sidebar');

    sf.on('search', update);
    update(term);

    function update(t) {
      if (!t) { return; }

      var existing = app.searches.where({ term : t }),
          time = new Date().getTime();

      if (existing.length) {
        existing[0].set('time', time);
      } else {
        app.searches.add({ term : t, time : time });
      }

      app.searches.sort();

      app.searchData.term = t;
      app.searchData.fetch();
    }

    return {
      controller : 'search',
      update : function(params) {
        return update(params.term);
      }
    };
  };
});
