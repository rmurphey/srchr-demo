define([
  'use!backbone',
  'app/views/searchForm'
], function(B, SearchForm) {
  describe("Search form", function() {
    var el, sf, currentSearch;

    beforeEach(function() {
      el = $('#test').empty();
      sf = new SearchForm({}).render().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.search-form').length).to.be(1);
    });

    it("should announce the form submission", function() {
      var t;

      sf.on('search', function(term) {
        t = term;
      });

      el.find('.js-input').val('searchterm');
      el.find('.search-form').submit();
      expect(t).to.be('searchterm');
    });

    it("should disable the submit button when the form is submitted", function() {
      el.find('.js-input').val('searchterm');
      el.find('.search-form').submit();
      expect(el.find('.js-submit').attr('disabled')).to.be.ok();
    });

    it("should enable the submit button when the release method is called", function() {
      el.find('.js-input').val('searchterm');
      el.find('.search-form').submit();
      expect(el.find('.js-submit').attr('disabled')).to.be.ok();
      sf.release();
      expect(el.find('.js-submit').attr('disabled')).not.to.be.ok();
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
