define([
  'app/collections/searchData'
], function(SearchData) {
  describe("Search Data Collection", function() {
    var sd, data;

    beforeEach(function() {
      sd = new SearchData();
      data = { data : { term : 'foo bar' } };

      sd.term = 'foo bar';
    });

    it("should return a URI-encoded URL", function() {
      expect(sd.url).to.be('/_data/search');
    });

    it("should trigger a fetching event when fetching", function() {
      var flag;

      sd.on('fetching', function() {
        flag = true;
      });

      sd.fetch(data);
      expect(flag).to.be.ok();
    });

    it("should trigger a change event when the fetch is complete", function(done) {
      var flag;

      this.timeout(5000);

      sd.on('change', function() {
        flag = true;
      });

      sd.fetch(data).then(function() {
        expect(flag).to.be.ok();
        done();
      });
    });

    /*
    it("should not trigger the change event if the current term changes", function(done) {
      var flag = true;

      sd.on('change', function() {
        flag = false;
      });

      sd.fetch(data).then(function() {
        expect(flag).to.be.ok();
        done();
      }, function() {
        expect(flag).to.be.ok();
        done();
      });

      sd.fetch({ data : { term : 'new term' } });
    });
    */

  });
});
