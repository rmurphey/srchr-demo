define([
  'use!backbone',
  'app/views/base'
], function(B, View) {
  describe("Base View", function() {
    var c, el, model;

    beforeEach(function() {
      $('#test').remove();
      el = $("<div id='test'></div>").appendTo(document.body);
      c = new View();
      model = new B.Model();
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

      it("should call the postRender method", function() {
        var flag = false,
            V = View.extend({
              postRender : function() {
                flag = true;
              }
            });

        c = new V().render();

        expect(flag).to.be(true);
      });

      it("should set up named properties for elements", function() {
        var V = View.extend({
          elements : [ 'wanted' ],
          template : '<div><section class="js-wanted"></section></div>'
        });

        c = new V().render();
        expect(c.wantedElement).to.be.ok();
        expect(c.wantedElement[0].nodeName.toLowerCase()).to.be('section');
        expect(c.wantedElement.hasClass('js-wanted')).to.be.ok();
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
        expect(ret.el).to.be(c.el);
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

    describe("#bindTo", function() {
      it("should bind to a model event", function() {
        var flag = false;

        c.bindTo(model, 'evt', function(val) {
          flag = val;
        });

        model.trigger('evt', true);
        expect(flag).to.be.ok();
      });

      it("should return an object with an unbind method", function() {
        var flag = false;

        var binding = c.bindTo(model, 'evt', function(val) {
          flag = val;
        });

        binding.unbind();
        model.trigger('evt', true);
        expect(flag).not.to.be.ok();
      });
    });

    describe("#unbind", function() {
      it("should unbind all bound events", function() {
        var flag = false;

        c.bindTo(model, 'evt', function(val) {
          flag = val;
        });

        c.unbind();

        model.trigger('evt', true);
        expect(flag).not.to.be.ok();
      });
    });

    describe("#destroy", function() {
      it("should call unbind", function() {
        var unbound = false;
        var oldUnbind = c.unbind;
        c.unbind = function() {
          oldUnbind.call(c);
          unbound = true;
        };
        c.destroy();
        expect(unbound).to.be.ok();
      });

      it("should remove the view from the dom", function() {
        c.placeAt(el);
        expect(el.children().length).to.be(1);
        c.destroy();
        expect(el.children().length).to.be(0);
      });
    });
  });
});
