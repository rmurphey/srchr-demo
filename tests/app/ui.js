define([
  'app/ui',
  'app/components/base'
], function(ui, C) {
  var el, component;

  describe("UI", function() {
    beforeEach(function() {
      el = $('#test').empty()
        .append('<div id="mainbar"></div>')
        .append('<div id="sidebar"></div>');

      component = new ( C() )();
      ui.reset();
    });

    it("should place a component at the specified location", function() {
      ui.place(component, 'mainbar');
    });

    it("should allow placing the component first in the destination", function() {
      var mainbar = el.find('#mainbar');

      mainbar.html("<div class='tmp'></div>");
      ui.place(component, 'mainbar', 'first');
      expect(mainbar.children().length).to.be(2);
      expect(mainbar.children().eq(0)[0]).to.be(component.el);
    });

    it("should allow placing the component last in the destination", function() {
      var mainbar = el.find('#mainbar');

      mainbar.html("<div class='tmp'></div>");
      ui.place(component, 'mainbar', 'last');
      expect(mainbar.children().length).to.be(2);
      expect(mainbar.children().eq(1)[0]).to.be(component.el);
    });

  });

});
