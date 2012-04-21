define([
  'use!underscore',
  'app/components/base',
  'text!templates/recentSearches.html',
  'text!templates/recentSearch.html'
], function(_, C, tpl, itemTpl) {
  return C({
    template : tpl,
    itemTpl : _.template(itemTpl),

    prepare : function() {
      this.searches.on('add remove change', this._update, this);
    },

    postRender : function() {
      this._update();
    },

    _update : function() {
      this.searches.sort();

      var tpl = this.itemTpl,
          currentSearch = this.currentSearch(),
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
