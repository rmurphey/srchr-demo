define([
  'app/models/app'
], function(app, undef) {
  describe("App model", function() {
    it("should have a currentSearch property", function() {
     expect(app.get('currentSearch')).not.to.be(undef);
    });
  });
});
