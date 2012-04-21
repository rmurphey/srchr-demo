define([
  'use!underscore',
  'jquery'
], function(_, $) {
  var mainbar, sidebar,
      config = {
        mainbar : '#mainbar',
        sidebar : '#sidebar'
      },
      cache = {},
      positions = {
        'first' : 'prepend',
        'last' : 'append',
        'only' : 'html'
      };

  return {
    place : function(component, destinationName, position) {
      position = position || 'last';
      var dest = cache[destinationName] = cache[destinationName] || $(config[destinationName]);
      dest[positions[position]](component.$el);
    },

    reset : function() {
      cache = {};
    }
  };
});
