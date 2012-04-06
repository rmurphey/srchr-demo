define([ 'app/component' ], function(C) {
  describe("Component", function() {
    var ComponentConstructor, c, el;

    beforeEach(function() {
      $('#test').remove();
      el = $("<div id='test'></div>").appendTo(document.body);
      ComponentConstructor = C();
      c = new ComponentConstructor();
    });

    it("should have a template by default", function() {
      expect(c.template).to.be.a('string');
    });

    it("should render the template to the component's element", function() {
      c.render();
      expect(c.$el.html()).to.be(c.template);
    });

    it("should be able to trigger events", function() {
      expect(c.trigger).to.be.a('function');
    });

    it("should allow placing the component into a node", function() {
      expect(el.children().length).to.be(0);
      c.placeAt(el);
      expect(el.children().length).to.be(1);
    });

  });
});
