define([
  'app/controllers/base',
  'app/views/base'
], function(C, View) {
  describe("Controller Base", function() {
    var el, V, destroyFlag;

    beforeEach(function() {
      destroyFlag = false;
      V = View.extend({ destroy : function() {
        destroyFlag = true;
      } });
      $('#test').remove();
      el = $("<div id='test'></div>").appendTo(document.body);
    });

    it("should create a controller", function() {
      var c = new C();
      expect(c.name).to.be.ok();
      expect(c.destroy).to.be.a('function');
      expect(c.update).to.be.a('function');
      expect(c.addView).to.be.a('function');
      expect(c.bindTo).to.be.a('function');
    });

    describe("#addView", function() {
      it("should provide a method for adding views", function() {
        expect(el.children().length).to.be(0);
        var c = new C();
        c.addView(V, {}, '#test');
        expect(el.children().length).to.be(1);
      });
    });

    describe("#destroy", function() {
      it("should destroy views when the controller is destroyed", function() {
        var c = new C();
        c.addView(V, {}, '#test');
        c.destroy();
        expect(destroyFlag).to.be.ok();
        expect(c.views.length).to.be(0);
      });
    });

    describe("#bindTo", function() {
      it("should bind to objects", function() {
        var flag = false;
        var c = new C();
        var view = c.addView(V, {}, '#test');
        c.bindTo(view, 'testevent', function() {
          flag = true;
        });
        view.trigger('testevent');
        expect(flag).to.be.ok();
      });

      it("should register bindings so they are destroyed", function() {
        var flag = false;
        var c = new C();
        var view = c.addView(V, {}, '#test');
        c.bindTo(view, 'testevent', function() {
          flag = true;
        });
        c.destroy();
        view.trigger('testevent');
        expect(flag).not.to.be.ok();
      });
    });
  });
});
