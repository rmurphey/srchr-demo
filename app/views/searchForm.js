define([
  'use!underscore',
  'views/base',
  'text!views/templates/searchForm.html'
], function(_, View, tpl) {
  return View.extend({
    template : tpl,

    prepare : function() {
      _.bindAll(this, 'release', '_onSearch', '_disable');
    },

    events : {
      'submit .search-form' :  '_onSearch'
    },

    _onSearch : function(e) {
      e.preventDefault();
      if (this.disabled) { return; }

      var term = $.trim(this.$('.js-input').val());
      if (!term) { return; }
      this._disable();
      this.trigger('search', term);
    },

    release : function() {
      this.disabled = false;
      this.$('.js-submit').removeAttr('disabled');
    },

    _disable : function() {
      this.disabled = true;
      this.$('.js-submit').attr('disabled', true);
    }
  });
});
