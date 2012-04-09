var tests;

if (window.location.hash) {
  tests = location.hash.replace('#', '').split(',');
  console.log(tests);
} else {
  tests = [
    'tests/app/components/base.js',
    'tests/app/components/searchForm',
    'tests/app/components/results',
    'tests/app/components/recentSearches'
  ]
}

require(tests, function() {
  mocha.run();
});
