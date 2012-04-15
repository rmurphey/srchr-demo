define([
  'use!backbone'
], function(B) {
  var SearchData = B.Collection.extend({
    fetch : function() {
      var fetch = _.bind(B.Collection.prototype.fetch, this),
          oldTerm = this.term;

      this.trigger('fetching');

      fetch().then(_.bind(function() {
        if (this.term !== oldTerm) { return; }
        this.trigger('change');
      }, this));
    },

    url : function() {
      return '/search/' + encodeURIComponent(this.term);
    }
  });

  return SearchData;
});
