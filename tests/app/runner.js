var tests;

if (window.location.hash) {
  tests = location.hash.replace('#', '').split(',');
} else {
  tests = [
    'tests/app/components/base',
    'tests/app/components/searchForm',
    'tests/app/components/results',
    'tests/app/components/recentSearches',
    'tests/app/ui'
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
