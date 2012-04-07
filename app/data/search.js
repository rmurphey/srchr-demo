define([ 'use!backbone' ], function(B) {
  var SearchResults = B.Collection.extend({
    url : function() {
      return '/search/' + encodeURIComponent(this.term);
    }
  });

  return new SearchResults();
});
