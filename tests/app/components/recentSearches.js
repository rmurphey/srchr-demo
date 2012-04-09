define([
  'app/components/recentSearches',
  'use!backbone'
], function(RecentSearches, Backbone) {
  describe("Recent searches", function() {
    var el, rs, data, searches,
        search = {
          term : 'foo'
        };

    beforeEach(function() {
      el = $('#test').empty();
      var Searches = Backbone.Collection.extend({});
      searches = new Searches([
        { term : 'foo' },
        { term : 'bar' }
      ]);

      rs = new RecentSearches({
        searches : searches,
        currentSearch : new Backbone.Model()
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
      rs.currentSearch.set('term', 'foo');
      expect(el.find('li.active').text()).to.contain('foo');
    });

    it("should update when there is a new search", function() {
      expect(el.html()).not.to.contain('baz');
      rs.searches.add({ term : 'baz' });
      rs.currentSearch.set('term', 'baz');
      expect(el.html()).to.contain('baz');
    });
  });
});
