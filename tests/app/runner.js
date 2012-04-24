var tests = [
  'tests/app/views/base',
  'tests/app/views/searchForm',
  'tests/app/views/results',
  'tests/app/views/recentSearches',

  'tests/app/collections/searches',
  'tests/app/collections/searchData',

  'tests/app/models/app',
  'tests/app/models/search',

  'tests/app/controllers/base'
];

require(tests, function() {
  mocha.run();
});
