define([
  'views/base',
  'text!views/templates/results.html',
  'text!views/templates/result.html'
], function(View, tpl, itemTpl) {
  return View.extend({
    options : { },
    template : tpl,

    elements : [ 'results' ],

    events : {
      'click .js-video-filter' : function(evt) {
        this._filter(evt, 'video');
      },
      'click .js-image-filter' : function(evt) {
        this._filter(evt, 'image');
      },
      'click .js-twitter-filter' : function(evt) {
        this._filter(evt, 'twitter');
      },
      'click .js-all-filter' : function(evt) {
        this._filter();
      }
    },

    initialize : function() {
      this.bindTo(this.collection, 'add change', this._update);
      this.bindTo(this.collection, 'fetching', function() {
        this._empty();
        this.reset();
      });
      this.itemTpl = _.template(itemTpl);
    },

    reset : function() {
      this._filter(
        { currentTarget : this.$('.js-all-filter') },
        ''
      );
    },

    _empty : function() {
      this.resultsElement.html('Loading &hellip;');
    },

    _filter : function(evt, type) {
      var target;

      if (evt && type) {
        target = $(evt.currentTarget);

        this.$('.result').hide();
        this.$('.result.' + type).show();
      } else {
        target = $('.js-all-filter');
        this.$('.result').show();
      }

      target.addClass('active').siblings().removeClass('active');
    },

    _update : function() {
      var tpl = this.itemTpl,
          counts = {
            all : this.collection.length,
            video : 0,
            image : 0,
            twitter : 0
          },
          html = this.collection.map(function(item) {
            var type = item.get('type'),
                data = item.toJSON();
            counts[type] += 1;
            data.icon = {
              'video' : 'icon-film',
              'image' : 'icon-picture',
              'twitter' : 'icon-user'
            }[data.type];

            return tpl(data);
          }).join('');

      this.resultsElement.html(html);

      _.forEach([ 'all', 'video', 'image', 'twitter' ], _.bind(function(type) {
        this.$('.js-' + type + '-count').html(counts[type]);
      }, this));
    }
  });
});
