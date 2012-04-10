define([
  'use!backbone',
  'data/favorites',
  'data/searches',
  'data/search',
  'models/user'
], function(B, Favorites, Searches, SearchData, User) {
  var searches =    new Searches(
                      JSON.parse(
                        window.localStorage.getItem('searches')
                      )
                    ),

      favorites =   new Favorites(),

      user =        new User(),

      search =      new B.Model({ term : null }),

      searchData =  new SearchData();

  searches.on('add remove', searches.store);
  user.on('change', function(u) {
    favorites.username = u.get('name');
  });

  return {
    searchData : searchData,
    favorites : favorites,
    searches : searches,
    currentSearch : search,
    currentUser : user
  };
});
