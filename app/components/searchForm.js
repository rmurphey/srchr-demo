define([ 'app/component', 'text!app/templates/searchForm.html' ], function(C, tpl) {
  return C({
    template : tpl,

    events : {
      'click .js-submit' :  '_onSearch'
    },

    _onSearch : function(e) {
      e.preventDefault();
      var term = $.trim(this.query('.js-input').val());
      if (!term) { return; }
      this.trigger('search', term);
    }
  });
});
