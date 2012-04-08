define([
  'data/search',
  'components/results',
  'components/searchForm'
], function(SearchData, ResultsComponent, SearchFormComponent) {
  return function(term) {
    var mainbar =   $('#mainbar').empty(),
        sf =        new SearchFormComponent().render().placeAt(mainbar),
        r =         new ResultsComponent({
                      searchData : SearchData
                    }).render().placeAt(mainbar);

    if (term) { update(term); }

    sf.on('search', function(term) {
      window.Router.navigate('/search/' + term, true);
    });

    function update(t) {
      SearchData.term = t;
      SearchData.fetch();
    }

    return {
      controller : 'Search',
      update : function(params) {
        update(params.term);
      }
    };
  };
});
