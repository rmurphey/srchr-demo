define([
  'models/app',
  'components/results',
  'components/searchForm',
  'components/recentSearches'
], function(app, ResultsComponent, SearchFormComponent, RecentSearchesComponent) {
  return function(term) {
    var mainbar =   $('#mainbar').empty(),
        sidebar =   $('#sidebar').empty(),

        sf =        new SearchFormComponent({
                    }).render().placeAt(mainbar),

        results =   new ResultsComponent({
                      searchData : app.searchData
                    }).render().placeAt(mainbar),

        recent =    new RecentSearchesComponent({
                      searches : app.searches,
                      currentSearch : app.currentSearch
                    }).render().placeAt(sidebar);

    app.currentSearch.on('change', function(s) {
      var term = s.get('term');
      app.router.navigate('/search/' + term, true);

      app.searches.add({
        term : term,
        time : new Date().getTime()
      });

      app.searchData.term = term;
      app.searchData.fetch();

      results.reset();
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
