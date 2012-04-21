define([
  'models/app',
  'ui',
  'components/results',
  'components/searchForm',
  'components/recentSearches'
], function(app, ui, ResultsComponent, SearchFormComponent, RecentSearchesComponent) {
  return function(term) {
    var sf =        new SearchFormComponent({}).render(),

        results =   new ResultsComponent({
                      searchData : app.get('searchData')
                    }).render(),

        recent =    new RecentSearchesComponent({
                      searches : app.get('searches'),
                      currentSearch : function() {
                        return app.get('currentSearch');
                      }
                    }).render();

    ui.place(sf, 'mainbar');
    ui.place(results, 'mainbar');
    ui.place(recent, 'sidebar');

    sf.on('search', update);
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
