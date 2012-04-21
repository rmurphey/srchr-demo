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
                      searches : app.searches,
                      currentSearch : app.currentSearch
                    }).render();

    ui.place(sf, 'mainbar');
    ui.place(results, 'mainbar');
    ui.place(recent, 'sidebar');

    app.currentSearch.on('change', function(s) {
      var term = s.get('term');
      app.router.navigate('/search/' + term, true);

      app.searches.add({
        term : term,
        time : new Date().getTime()
      });

      app.searchData.term = term;
      app.searchData.fetch();
    });

    sf.on('search', function(term) {
      app.currentSearch.set('term', term);
    });

    update(term);

    function update(t) {
      return t && app.currentSearch.set('term', t);
    }

    return {
      controller : 'search',
      update : function(params) {
        return update(params.term);
      }
    };
  };
});
