define([
  'controllers/base',

  'models/app',

  'collections/searchData',
  'collections/searches',

  'views/results',
  'views/searchForm',
  'views/recentSearches'
], function(Controller, app, searchData, searches, ResultsView, SearchFormView, RecentSearchesView) {
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
      if (!t) { return; }

      app.set('currentSearch', t);

      var existing =      searches.where({ term : t }),
          time =          new Date().getTime();

      if (existing.length) {
        existing[0].set('time', time);
      } else {
        searches.add({ term : t, time : time });
      }

      searchData.fetch({ data : { term : t } })
        .then(searchForm.release, searchForm.release);
    }

    return SearchController;
  };
});
