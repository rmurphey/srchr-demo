define([
  'use!underscore',
  'views/base',
  'text!views/templates/recentSearches.html',
  'text!views/templates/recentSearch.html'
], function(_, C, tpl, itemTpl) {
  return C({
    template : tpl,
    itemTpl : _.template(itemTpl),

    prepare : function() {
      if (!_.isFunction(this.currentSearch)) {
        throw new Error('Recent searches component needs a currentSearch function');
      }
    },

    update : function(searches) {
      var tpl = this.itemTpl,
          currentSearch = this.currentSearch(),
          html = searches.map(function(item) {
            if (item.term) {
              item.current = item.term === currentSearch;
              return tpl(item);
            }

            return '';
          }).join('');

      this.query('.js-searches').html(html);
    }
  });
});
