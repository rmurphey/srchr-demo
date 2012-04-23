define([
  'use!underscore'
], function(_) {
  var Controller = function(config) {
    this.views = [];
    this.bindings = [];
    this.initialize(config);
    return this;
  };

  Controller.prototype = {
    name : 'base',

    initialize : function(config) {
      _.bindAll(this, 'destroy', 'addView', 'update', 'bindTo');
      _.extend(this, config);
    },

    destroy : function() {
      _.each(this.views, function(v) {
        v.destroy();
      });

      _.each(this.bindings, function(b) {
        b.obj.unbind(b.evt, b.fn);
      });
    },

    addView : function(View, config, node) {
      var v = new View(config).render().placeAt(node);
      this.views.push(v);
      return v;
    },

    bindTo : function(obj, evt, fn) {
      obj.bind(evt, fn, this);
      this.bindings.push({
        obj : obj,
        fn : fn,
        view : view
      });
    },

    update : function() {

    }
  };

  return Controller;
});
