define([
  'controllers/base',

  'models/app',
  'models/search',

  'collections/searchData',
  'collections/searches',

  'views/results',
  'views/searchForm',
  'views/recentSearches'
], function(Controller, app, Search, SearchData, Searches, ResultsView, SearchFormView, RecentSearchesView) {
  var searches = new Searches(),
      searchData = new SearchData();

  return function(term) {
    var SearchController  = new Controller({
          name : 'search',
          update : function(params) {
            return update(params.term);
          }
        });

    var searchForm        = SearchController.addView(SearchFormView, {}, '#mainbar'),
        results           = SearchController.addView(ResultsView, {
                              searchData : searchData
                            }, '#mainbar'),
        recent            = SearchController.addView(RecentSearchesView, {
                              searches : searches,
                              currentSearch : function() {
                                return app.get('currentSearch');
                              }
                            }, '#sidebar');

    searchForm.on('search', update);
    update(term);

    function update(t) {
      var term            = $.trim(t),
          existing        = searches.where({ term : term }),
          search;

      app.set('currentSearch', term);

      if (existing.length) {
        search = existing[0];
        search.update();
      } else {
        search = new Search({ term : term });
        searches.add(search);
      }

      searchData.fetch({ data : { term : term } })
        .always(searchForm.release);

      app.router.navigate('search/' + term);
    }

    return SearchController;
  };
});
