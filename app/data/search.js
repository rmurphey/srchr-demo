define([
  'use!backbone'
], function(B) {
  var SearchData = B.Collection.extend({
    fetch : function() {
      var fetch = _.bind(B.Collection.prototype.fetch, this);
      this.trigger('fetching');
      fetch().then(_.bind(this.trigger, this, 'change'));
    },

    url : function() {
      return '/search/' + encodeURIComponent(this.term);
    }
  });

  return SearchData;
});
