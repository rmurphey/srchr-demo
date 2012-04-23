var tests = [
  'tests/app/views/base',
  'tests/app/views/searchForm',
  'tests/app/views/results',
  'tests/app/views/recentSearches',

  'tests/app/collections/searches',
  'tests/app/collections/searchData'
];

require(tests, function() {
  mocha.run();
});
