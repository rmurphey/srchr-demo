var tests;

if (window.location.hash) {
  tests = location.hash.replace('#', '').split(',');
} else {
  tests = [
    'tests/app/views/base',
    'tests/app/views/searchForm',
    'tests/app/views/results',
    'tests/app/views/recentSearches',

    'tests/app/collections/searches',
    'tests/app/collections/searchData'
  ];
}

if (Array.prototype.forEach) {
  var $filter = $('<div id="filter-tests"></div>').insertBefore('#mocha');

  tests.forEach(function(t) {
    $filter.append('<li><a href="#' + t + '">' + t + '</a></li>');
  });

  $filter.find('a').click(function() {
    window.location.reload();
  });
}

require(tests, function() {
  mocha.run();
});
