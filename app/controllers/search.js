define([
  'models/app',
  'components/results',
  'components/searchForm',
  'components/recentSearches',
  'components/user'
], function(app, ResultsComponent, SearchFormComponent, RecentSearchesComponent, UserComponent) {
  return function(term) {
    var mainbar =   $('#mainbar').empty(),
        sidebar =   $('#sidebar').empty(),

        sf =        new SearchFormComponent().render().placeAt(mainbar),

        results =   new ResultsComponent({
                      searchData : app.searchData
                    }).render().placeAt(mainbar),

        user =      new UserComponent({
                      user : app.currentUser
                    }).render().placeAt(sidebar),

        recent =    new RecentSearchesComponent({
                      searches : app.searches,
                      currentSearch : app.currentSearch
                    }).render().placeAt(sidebar);

    sf.on('search', function(term) {
      window.Router.navigate('/search/' + term, true);
    });

    app.currentSearch.on('change', function(s) {
      app.searchData.term = s.get('term');
      app.searchData.fetch();
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
