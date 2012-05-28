define([
  'use!underscore',
  'views/base',
  'text!views/templates/recentSearches.html',
  'text!views/templates/recentSearch.html'
], function(_, View, tpl, itemTpl) {
  return View.extend({
    options : { },
    template : tpl,
    itemTpl : _.template(itemTpl),

    prepare : function() {
      if (!_.isFunction(this.options.currentSearch)) {
        throw new Error('Recent searches component needs a currentSearch function');
      }
      this.bindTo(this.options.searches, 'add remove change', this._update);
    },

    postRender : function() {
      this._update();
    },

    _update : function() {
      this.options.searches.sort();

      var tpl = this.itemTpl,
          currentSearch = this.options.currentSearch(),
          html = this.options.searches.map(function(item) {
            var data = item.toJSON();

            if (data.term) {
              data.current = data.term === currentSearch;
              return tpl(data);
            }

            return '';
          }).join('');

      this.$('.js-searches').html(html);
    }
  });
});
