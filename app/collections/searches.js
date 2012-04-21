define([
  'use!backbone',
  'models/search'
], function(B, Search) {
  var Searches = B.Collection.extend({
    comparator : function(item) {
      return item.get('time') * -1;
    },
    model : Search,
    store : function(item) {
      window.localStorage.setItem('searches', JSON.stringify(this.toJSON()));
    },
    initialize : function() {
      this.on('add remove change', this.store);
    }
  });

  return Searches;
});
