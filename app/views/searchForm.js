define([
  'use!underscore',
  'views/base',
  'text!views/templates/searchForm.html'
], function(_, View, tpl) {
  return View.extend({
    template : tpl,

    elements : [ 'input', 'submit' ],

    initialize : function() {
      _.bindAll(this, 'release');
    },

    events : {
      'submit .search-form' :  '_onSearch'
    },

    _onSearch : function(e) {
      e.preventDefault();
      if (this.disabled) { return; }

      var term = $.trim(this.inputElement.val());
      if (!term) { return; }
      this._disable();
      this.trigger('search', term);
    },

    release : function() {
      this.disabled = false;
      this.submitElement.removeAttr('disabled');
    },

    _disable : function() {
      this.disabled = true;
      this.submitElement.attr('disabled', true);
    }
  });
});
