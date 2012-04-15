define([
  'app/components/results',
  'use!backbone'
], function(Results, B) {
  describe("Results", function() {
    var el, r, data,
        baseItem = {
          thumb : '/',
          title : 'Title',
          link : 'link.html'
        };

    beforeEach(function() {
      el = $('#test').empty();

      var Data = Backbone.Collection.extend({
        fetch : function() { }
      });

      data = new Data([
        _.extend(_.clone(baseItem), { type : 'video', content : '' }),
        _.extend(_.clone(baseItem), { type : 'image', content : '' })
      ]);

      r = new Results({
        searchData : data
      }).render().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.results').length).to.be(1);
    });

    it("should update when the data changes", function() {
      data.trigger('change');
      expect(el.find('.result.video').length).to.be(1);
      expect(el.find('.result.image').length).to.be(1);
      expect(el.find('.js-video-count').text()).to.be('1');
      expect(el.find('.js-image-count').text()).to.be('1');
      expect(el.find('.js-all-count').text()).to.be('2');
    });

    it("should filter the results", function() {
      data.trigger('change');
      el.find('.js-video-filter').trigger('click');
      expect(el.find('.js-video-filter').hasClass('active')).to.be(true);
      expect(el.find('.result.image').filter(':visible').length).to.be(0);
      expect(el.find('.result.video').filter(':visible').length).to.be(1);
    });

    describe("#reset", function() {
      it("should reset the tabs", function() {
        r._filter({
          currentTarget : el.find('.js-image-filter')
        }, 'image');

        r.reset();

        expect(el.find('.js-all-filter').hasClass('active')).to.be.ok();
        expect(el.find('.active').length).to.be(1);
      });

    });

  });
});
