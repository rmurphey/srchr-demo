define([
  'components/base',
  'text!app/templates/user.html'
], function(C, tpl) {
  return C({
    template : tpl,

    prepare : function() {
      this.user.on('change', _.bind(this._update, this));
    },

    postRender : function() {
      this._update();
      this.query('form').submit(_.bind(function(e) {
        e.preventDefault();
        var name = this.query('.js-input').val();
        console.log('new name is', name, this.query('.js-input'));
        this.user.set('name', this.query('.js-input').val());
      }, this));
    },

    _update : function() {
      var name = this.user.get('name');

      if (name) {
        this.query('.js-logged-in').show();
        this.query('.js-logged-out').hide();
        this.query('.js-username').text(name);
      } else {
        var out = this.query('.js-logged-out').show();
        console.log(out);
        this.query('.js-logged-in').hide();
      }
    }
  });
});
