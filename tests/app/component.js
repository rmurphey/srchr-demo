define([ 'app/component' ], function(C) {
  describe("Component", function() {
    var ComponentConstructor, c;

    beforeEach(function() {
      ComponentConstructor = C();
      c = new ComponentConstructor();
    });

    it("should have a template by default", function() {
      expect(c.template).to.be.ok();
    });

    it("should render the template to the component's element", function() {
      c.render();
      expect(c.$el.html()).to.be(c.template);
    });

    it("should be able to trigger events", function() {
      expect(c.trigger).to.be.a('function');
    });
  });
});
