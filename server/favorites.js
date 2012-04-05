var q = require('q');

var favorites = {},
    createId = function() {
      return (new Date().getTime()) + Math.random();
    };

module.exports = {
  add : function(favorite) {
    favorite.id = createId();
    favorites[favorite.id] = favorite;
    return favorite.id;
  },

  remove : function(id) {
    delete favorites[id];
  },

  get : function(id) {
    if (id) {
      return favorites[id];
    }

    return Object.keys(favorites).map(function(id) {
      return favorites[id];
    });
  },

  update : function(id, obj) {
    favorites[id] = obj;
    return id;
  }
};
