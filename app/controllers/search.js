define([
  'models/app',
  'data/search',
  'components/results',
  'components/searchForm',
  'components/recentSearches'
], function(app, SearchData, ResultsComponent, SearchFormComponent, RecentSearchesComponent) {
  return function(term) {
    var mainbar =   $('#mainbar').empty(),
        sidebar =   $('#sidebar').empty(),

        sf =        new SearchFormComponent().render().placeAt(mainbar),

        results =   new ResultsComponent({
                      searchData : SearchData
                    }).render().placeAt(mainbar),

        recent =    new RecentSearchesComponent({
                      searches : app.searches
                    }).render().placeAt(sidebar);

    if (term) { update(term); }

    sf.on('search', function(term) {
      window.Router.navigate('/search/' + term, true);
    });

    function update(t) {
      SearchData.term = t;
      SearchData.fetch();
    }

    return {
      controller : 'search',
      update : function(params) {
        update(params.term);
      }
    };
  };
});
