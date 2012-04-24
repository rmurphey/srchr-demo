define([
  'use!backbone'
], function(B) {
  var SearchData = B.Collection.extend({
    fetch : function(opts) {
      var fetch = _.bind(B.Collection.prototype.fetch, this),
          dfd = $.Deferred();

      this.trigger('fetching');

      fetch(opts).then(_.bind(function() {
        this.trigger('change');
        dfd.resolve();
      }, this));

      return dfd;
    },

    url : '/_data/search'
  });

  return SearchData;
});
