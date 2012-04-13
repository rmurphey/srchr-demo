define([ 'app/components/base', 'text!app/templates/searchForm.html' ], function(C, tpl) {
  return C({
    template : tpl,

    events : {
      'submit .search-form' :  '_onSearch'
    },

    _onSearch : function(e) {
      e.preventDefault();
      var term = $.trim(this.query('.js-input').val());
      if (!term) { return; }
      this.currentSearch.set('term', term);
    }
  });
});
