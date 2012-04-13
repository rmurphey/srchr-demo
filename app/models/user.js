define([
  'use!backbone'
], function(B) {
  var User = B.Model.extend({
    initialize : function() {
      this.set('name', window.localStorage.getItem('username'));
      this.on('change', this._store);
    },

    _store : function() {
      window.localStorage.setItem('username', this.get('name'));
    }
  });

  return User;
});
