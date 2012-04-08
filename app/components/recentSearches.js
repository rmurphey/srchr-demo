define([
  'use!underscore',
  'app/components/base',
  'text!templates/recentSearches.html',
  'text!templates/recentSearch.html'
], function(_, C, tpl, itemTpl) {
  return C({
    template : tpl,
    itemTpl : _.template(itemTpl),

    initialize : function(config) {
      _.keys(config).forEach(_.bind(function(k) {
        this[k] = config[k];
      }, this));

      this.searches.on('add remove change', _.bind(this._update, this));
      this.on('render', this._update);
    },

    _update : function() {
      var tpl = this.itemTpl,
          html = this.searches.map(function(item) {
            return tpl(item.toJSON());
          }).join('');

      console.log(this.$el);
      this.query('.js-searches').html(html);
    }
  });
});
