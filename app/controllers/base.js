define([
  'use!underscore'
], function(_) {
  var Controller = function(config) {
    this.views = [];
    this.initialize(config);
    return this;
  };

  Controller.prototype = {
    name : 'base',

    initialize : function(config) {
      _.extend(this, config);
    },

    destroy : function() {
      _.each(this.views, function(v) {
        v.destroy();
      });

      this.views = [];
    },

    addView : function(View, config, node) {
      var v = new View(config).render().placeAt(node);
      this.views.push(v);
      return v;
    },

    update : function() { }
  };

  return Controller;
});
