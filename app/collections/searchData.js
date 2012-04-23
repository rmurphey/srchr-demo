define([
  'use!backbone'
], function(B) {
  var SearchData = B.Collection.extend({
    fetch : function(opts) {
      var fetch = _.bind(B.Collection.prototype.fetch, this),
          oldTerm = this.term,
          dfd = $.Deferred();

      this.trigger('fetching');

      fetch(opts).then(_.bind(function() {
        if (this.term !== oldTerm) {
          dfd.reject();
          return;
        }
        this.trigger('change');
        dfd.resolve();
      }, this));

      return dfd;
    },

    url : '/_data/search'
  });

  return SearchData;
});
