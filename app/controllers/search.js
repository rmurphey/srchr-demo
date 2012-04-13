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
                      currentSearch : app.currentSearch
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

      window.Router.navigate('/search/' + term, true);

      app.searches.add({ term : term, time : new Date().getTime() });
      app.searchData.term = s.get('term');
      app.searchData.fetch();
      results.reset();
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
