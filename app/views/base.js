define([
  "use!backbone",
  "use!underscore",
  "jquery"
], function(Backbone, _, $) {
  var tplCache = {};

  if (window.JST && _.isObject(window.JST)) {
    tplCache = _.extend(tplCache, window.JST);
  }

  var View = Backbone.View.extend({
    template : '<div></div>',

    initialize : function(config) {
      _.bindAll(this, 'bindTo', 'unbind');
      this._bindings = [];
      this.prepare();
    },

    _setupElements : function() {
      if (this.elements) {
        _.each(this.elements, function(c) {
          this[c + 'Element'] = this.$('.js-' + c).eq(0);
        }, this);
      }
    },

    prepare : function() {
      // stub for implementation
    },

    render : function() {
      if (!tplCache[this.template]) {
        tplCache[this.template] = _.template(this.template);
      }

      var tpl = tplCache[this.template],
          data = this.serialize();

      this.$el.html(tpl(data));
      this._setupElements();
      this.postRender();

      return this;
    },

    serialize : function() {
      if (this.model || this.collection) {
        return (this.model || this.collection).toJSON();
      }

      return this;
    },

    postRender : function() {
      // stub for implementation
    },

    placeAt : function(node, position) {
      var method = {
        'first' :     'prepend',
        'last' :      'append',
        'only' :      'html'
      }[position] || 'append';

      $(node)[method](this.$el);
      return this;
    },

    // ref: http://stackoverflow.com/questions/7567404/backbone-js-repopulate-or-recreate-the-view/7607853
    bindTo : function(model, evt, fn) {
      model.bind(evt, fn, this);
      this._bindings.push(model);

      return {
        unbind : function() {
          model.off(evt, fn);
        }
      };
    },

    unbind : function() {
      _.each(this._bindings, function(b) {
        b.off(null, null, this);
      }, this);
    },

    destroy : function() {
      this.unbind();
      this.remove();
    }
  });

  return View;
});
