define([
  'app/collections/searches'
], function(Searches) {
  var s;

  describe("Searches Collection", function() {

    beforeEach(function() {
      window.localStorage.removeItem('searchesTest');
      Searches.prototype.storageKey = 'searchesTest';
      s = new Searches();
    });

    it("should sort items in reverse chronological order based on the `time` property", function() {
      s.add({ term : 'foo', time : 123 });
      s.add({ term : 'bar', time : 456 });
      s.add({ term : 'baz', time : 345 });

      expect(s.first().get('term')).to.be('bar');
    });

    it("should store items in local storage", function() {
      s.add({ term : 'foo', time : 123 });
      s.add({ term : 'bar', time : 456 });
      s.add({ term : 'baz', time : 345 });

      expect(
        JSON.parse(window.localStorage.getItem('searchesTest')).length
      ).to.be(3);
    });

    it("should initialize from local storage", function() {
      window.localStorage.setItem('searchesTest', JSON.stringify([ { term : 'foo', time : 123 } ]));

      s = new Searches();
      expect(s.where({ term : 'foo' }).length).to.be(1);
    });
  });
});
