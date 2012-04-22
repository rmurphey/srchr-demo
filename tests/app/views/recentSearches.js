define([
  'app/views/recentSearches',
  'use!backbone'
], function(RecentSearches, Backbone) {
  describe("Recent searches", function() {
    var el, rs, data, searches,
        search = {
          term : 'foo'
        };

    beforeEach(function() {
      el = $('#test').empty();
      var Searches = Backbone.Collection.extend({
        comparator : function() {
          return -1;
        }
      });
      searches = new Searches([
        { term : 'foo' },
        { term : 'bar' }
      ]);

      rs = new RecentSearches({
        searches : searches,
        currentSearch : function() {
          return 'foo';
        }
      }).render().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.recent-searches').length).to.be(1);
    });

    it("should display the recent searches", function() {
      expect(el.html()).to.contain('foo');
      expect(el.html()).to.contain('bar');
    });

    it("should mark the current search term", function() {
      expect(el.find('li.active').text()).to.contain('foo');
    });

    it("should update when there is a new search", function() {
      expect(el.html()).not.to.contain('baz');
      rs.currentSearch = function() { return 'baz'; };
      rs.searches.add({ term : 'baz' });
      expect(el.html()).to.contain('baz');
      expect(el.find('.active').html()).to.contain('baz');
    });

    it("should throw an error if currentSearch is not defined", function() {
      expect(function() {
        new RecentSearches({
          searches : searches
        });
      }).to.throwError();
    });

    it("should throw an error if searches is not defined", function() {
      expect(function() {
        new RecentSearches({
          currentSearch : function() {}
        });
      }).to.throwError();
    });
  });
});
