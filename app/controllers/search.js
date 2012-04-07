define([
  'data/search',
  'components/results',
  'components/searchForm'
], function(SearchData, ResultsComponent, SearchFormComponent) {
  return function(term) {
    var mainbar = $('#mainbar').empty();
    new SearchFormComponent().render().placeAt(mainbar);
    new ResultsComponent().render().placeAt(mainbar);

    SearchData.term = term;
    SearchData.fetch().then(function(results) {
    });
  };
});
