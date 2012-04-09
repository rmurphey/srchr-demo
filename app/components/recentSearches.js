define([
  'use!underscore',
  'app/components/base',
  'text!templates/recentSearches.html',
  'text!templates/recentSearch.html'
], function(_, C, tpl, itemTpl) {
  return C({
    template : tpl,
    itemTpl : _.template(itemTpl),

    connects : function() {
      this.on('render', this._update);
      this.currentSearch.on('change', _.bind(this._update, this));
    },

    _update : function() {
      var tpl = this.itemTpl,
          currentSearch = this.currentSearch.get('term'),
          html = this.searches.map(function(item) {
            var data = item.toJSON();

            if (data.term) {
              data.current = data.term === currentSearch;
              return tpl(data);
            }

            return '';
          }).join('');

      this.query('.js-searches').html(html);
    }
  });
});
