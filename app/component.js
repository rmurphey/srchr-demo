define([
  "use!backbone",
  "use!underscore",
  "jquery"
], function(Backbone, _, $) {
  var tplCache = {};

  var Component = function(config) {
    var ComponentContstructor = Backbone.View.extend(_.extend({
      template : '<div></div>',

      render : function() {
        if (!tplCache[this.template]) {
          tplCache[this.template] = _.template(this.template);
        }

        var tpl = tplCache[this.template],
            data = this.model ? this.model.toJSON() : this;

        this.$el.html(tpl(data));
        return this;
      },

      placeAt : function(node) {
        $(node).append(this.$el);
        return this;
      },

      query : function(sel) {
        return this.$el.find(sel);
      }
    }, config));

    ComponentContstructor.extend(Backbone.Events);

    return ComponentContstructor;
  };

  return Component;
});

