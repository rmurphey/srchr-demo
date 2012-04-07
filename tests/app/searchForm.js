define([ 'app/components/searchForm' ], function(SearchForm) {
  describe("Search form", function() {
    var el, sf;

    beforeEach(function() {
      el = $('#test').empty();
      sf = new SearchForm().render().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.search-form').length).to.be(1);
    });

    it("should listen for the form to submit", function() {
      var t;

      sf.on('search', function(term) {
        t = term;
      });

      el.find('.js-input').val('searchterm');
      el.find('.search-form').submit();
      expect(t).to.be('searchterm');
    });

    it("should not announce an empty search", function() {
      var t = false;

      sf.on('search', function(term) {
        t = true;
      });

      el.find('.js-input').val(' ');
      el.find('.search-form').submit();
      expect(t).to.be(false);
    });
  });

});
