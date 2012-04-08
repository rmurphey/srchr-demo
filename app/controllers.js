define([
  'controllers/search',
  'controllers/favorites'
], function(search, favorites) {
  return {
    search : search,
    favorites : favorites
  };
});
