define([
  'app/components/base',
  'text!app/templates/results.html',
  'text!app/templates/result.html'
], function(C, tpl, itemTpl) {
  return C({
    template : tpl,

    events : {
      'click .js-video-filter' : function(evt) {
        this._filter(evt, '.video');
      },
      'click .js-image-filter' : function(evt) {
        this._filter(evt, '.image');
      },
      'click .js-all-filter' : function(evt) {
        this._filter(evt, '');
      }
    },

    prepare : function() {
      this.searchData.on('change', _.bind(this._update, this));
      this.itemTpl = _.template(itemTpl);
    },

    reset : function() {
      this._filter(
        { currentTarget : this.query('.js-all-filter') },
        ''
      );
    },

    _filter : function(evt, type) {
      $(evt.currentTarget).addClass('active').siblings().removeClass('active');
      if (type) {
        this.query('.result').hide();
      }
      this.query('.result' + type).show();
    },

    _update : function() {
      var tpl = this.itemTpl,
          html = this.searchData.map(function(item) {
            return tpl(item.toJSON());
          }).join(''),
          counts = {
            all : 0,
            video : 0,
            image : 0
          };

      this.searchData.forEach(function(item) {
        var type = item.get('type');
        counts[type] += 1;
        counts.all += 1;
      });

      this.query('.js-results').html(html);

      _.forEach([ 'all', 'video', 'image' ], _.bind(function(type) {
        this.query('.js-' + type + '-count').html(counts[type]);
      }, this));
    }
  });
});
