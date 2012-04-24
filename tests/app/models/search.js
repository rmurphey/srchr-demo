define([
  'app/models/search'
], function(Search) {
  describe("Search model", function() {
    it("should have a time by default", function() {
      expect(new Search().get('time')).to.be.ok();
    });

    describe("#update", function() {
      it("should update the time", function(done) {
        var search = new Search(),
            oldTime = search.get('time');

        setTimeout(function() {
          search.update();
          expect(search.get('time')).to.be.greaterThan(oldTime);
          done();
        }, 1000);
      });
    });
  });
});
