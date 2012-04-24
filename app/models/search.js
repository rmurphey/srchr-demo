define([
  'use!backbone'
], function(B) {
  function time() {
    return new Date().getTime();
  }

  return B.Model.extend({
    idAttribute : 'term',
    defaults : function() {
      return { time : time() };
    },
    update : function() {
      this.set('time', time());
    }
  });
});
