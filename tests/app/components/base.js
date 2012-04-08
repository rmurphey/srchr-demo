define([ 'app/components/base' ], function(C) {
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

    describe("events", function() {
      it("should be able to trigger events", function() {
        var flag = false;
        c.on('foo', function() { flag = true; });
        c.trigger('foo');
        expect(flag).to.be(true);
      });
    });

    describe("#render", function() {
      it("should render the template to the component's element", function() {
        c.render();
        expect(c.$el.html()).to.be(c.template);
      });

      it("should be chainable", function() {
        var ret = c.render();
        expect(ret).to.be(c);
      });

      it("should trigger a render event", function() {
        var flag;
        c.on('render', function() { flag = true; });
        c.render();
        expect(flag).to.be(true);
      });
    });

    describe("#placeAt", function() {
      it("should place the component into a node", function() {
        expect(el.children().length).to.be(0);

        var ret = c.placeAt(el);
        expect(el.children().length).to.be(1);
      });

      it("should be chainable", function() {
        var ret = c.placeAt(el);
        expect(ret).to.be(c);
      });

      it("should append the component by default", function() {
        el.html('<div class="original"></div>');
        c.placeAt(el);

        var children = el.children();
        expect(children.length).to.be(2);
        expect(children[0].className).to.contain('original');
        expect(children[1]).to.be(c.el);
      });

      it("should prepend the component if the position argument is 'first'", function() {
        el.html('<div class="original"></div>');
        c.placeAt(el, 'first');

        var children = el.children();
        expect(children.length).to.be(2);
        expect(children[0]).to.be(c.el);
        expect(children[1].className).to.contain('original');
      });

      it("should replace the original contents of the destination with the component if the position argument is 'only'", function() {
        el.html('<div class="original"></div>');
        c.placeAt(el, 'only');

        var children = el.children();
        expect(children.length).to.be(1);
        expect(children[0]).to.be(c.el);
      });
    });

    describe("#query", function() {
      it("should query inside the component", function() {
        c.$el.append('<div class="foo"></div>');
        expect(c.query('.foo').length).to.be(1);
      });
    });

  });
});
