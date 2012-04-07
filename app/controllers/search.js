define([
  'data/search',
  'components/results',
  'components/searchForm'
], function(SearchData, ResultsComponent, SearchFormComponent) {
  return function(term) {
    update(term);

    function update(t) {
      var mainbar =   $('#mainbar').empty(),
          sf =        new SearchFormComponent().render().placeAt(mainbar),
          r =         new ResultsComponent().render().placeAt(mainbar);

      SearchData.term = t;
      SearchData.fetch().then(function(results) {
        SearchData.trigger('change');
      });
    }

    return {
      controller : 'Search',
      update : function(params) {
        update(params.term);
      }
    };
  };
});
