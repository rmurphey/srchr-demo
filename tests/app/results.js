define([ 'app/components/results' ], function(Results) {
  describe("Results", function() {
    var el, r;

    beforeEach(function() {
      el = $('#test').empty();
      r = new Results().render().placeAt(el);
    });

    it("should create the component", function() {
      expect(el.find('.component.results').length).to.be(1);
    });

  });

});
