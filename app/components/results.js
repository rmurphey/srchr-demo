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
      'click .js-twitter-filter' : function(evt) {
        this._filter(evt, '.twitter');
      },
      'click .js-all-filter' : function(evt) {
        this._filter(evt, '');
      }
    },

    prepare : function() {
      this.searchData.on('change', _.bind(this._update, this));
      this.searchData.on('fetching', _.bind(this._empty, this));
      this.itemTpl = _.template(itemTpl);
    },

    reset : function() {
      this._filter(
        { currentTarget : this.query('.js-all-filter') },
        ''
      );
    },

    _empty : function() {
      this.query('.js-results').html('Loading &hellip;');
    },

    _filter : function(evt, type) {
      $(evt.currentTarget).addClass('active').siblings().removeClass('active');
      if (type) {
        this.query('.result').hide();
      }
      var results = this.query('.result' + type).show();
    },

    _update : function() {
      var tpl = this.itemTpl,
          counts = {
            all : 0,
            video : 0,
            image : 0,
            twitter : 0
          },
          html = this.searchData.map(function(item) {
            console.log('got here');
            var type = item.get('type');
            counts[type] += 1;
            counts.all += 1;
            var data = item.toJSON();
            data.icon = {
              'video' : 'icon-film',
              'image' : 'icon-picture',
              'twitter' : 'icon-user'
            }[data.type];

            return tpl(data);
          }).join('');

      this.query('.js-results').html(html);

      _.forEach([ 'all', 'video', 'image', 'twitter' ], _.bind(function(type) {
        this.query('.js-' + type + '-count').html(counts[type]);
      }, this));
    }
  });
});
