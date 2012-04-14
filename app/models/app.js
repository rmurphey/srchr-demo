define([
  'use!backbone',
  'collections/searches',
  'data/favorites',
  'data/search',
  'models/user'
], function(B, Searches, Favorites, SearchData, User) {
  var searches =    new Searches(
                      JSON.parse(
                        window.localStorage.getItem('searches')
                      )
                    ),

      user =        new User(),

      favorites =   new Favorites({ user : user }),

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
