require([
  'controllers/search',
  'controllers/favorites'
], function(search, favorites) {
  return {
    Search : search,
    Favorites : favorites
  };
});
