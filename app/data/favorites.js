define([
  'use!backbone'
], function(B) {
  var Favorite = Backbone.Model.extend({

  });

  var Favorites = Backbone.Collection.extend({
    model : Favorite,
    url : function() {
      return '/favorites/' + this.user.get('name') + '/';
    }
  });

  return Favorites;
});
