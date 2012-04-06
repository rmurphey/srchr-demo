define([ 'app/components/searchForm' ], function(SearchForm) {
  describe("Search form", function() {
    var el, sf;

    beforeEach(function() {
      $('#test').remove();
      el = $("<div id='test'></div>").appendTo(document.body);
      sf = new SearchForm().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.search-form').length).to.be(1);
    });


  });

});
