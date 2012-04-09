define([
  'use!backbone'
], function(B) {
  var Search = B.Model.extend({
    idAttribute : 'term'
  });

  var Searches = B.Collection.extend({
    comparator : function(item) {
      return item.get('time') * -1;
    },
    model : Search,
    store : function(item) {
      window.localStorage.setItem('searches', JSON.stringify(this.toJSON()));
    }
  });

  var searches = new Searches(JSON.parse(window.localStorage.getItem('searches')));
  searches.on('add remove', searches.store);

  return {
    searches : searches,
    currentSearch : new Backbone.Model({ term : null })
  };
});
