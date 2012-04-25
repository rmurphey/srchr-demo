define([
  'use!backbone',
  'models/search'
], function(B, Search) {
  var Searches = B.Collection.extend({
    comparator : function(item) {
      return item.get('time') * -1;
    },
    storageKey : 'searches',
    model : Search,
    store : function() {
      window.localStorage.setItem(this.storageKey, JSON.stringify(this.toJSON()));
    },
    initialize : function(config) {
      var searches = JSON.parse(window.localStorage.getItem(this.storageKey));
      _.each(searches, _.bind(this.add, this));
      this.on('add remove change', this.store);
    }
  });

  return Searches;
});
