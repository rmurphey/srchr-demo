define([
  'app/controllers/search'
], function(Search) {
  describe("Search controller", function() {
    var s, el, mainbar, sidebar, navigatedTo;

    beforeEach(function() {
      navigatedTo = false;

      $('#test').remove();
      el = $("<div id='test'></div>").appendTo(document.body);
      mainbar = $("<div id='mainbar'></div>").appendTo(el);
      sidebar = $("<div id='sidebar'></div>").appendTo(el);

      s = Search();
      s.app.router = {
        navigate : function(dest) {
          navigatedTo = dest;
        }
      };
    });

    it("should set up the page", function() {
      expect($('.component.results').length).to.be(1);
      expect($('.component.recent-searches').length).to.be(1);
      expect($('.component.search-form').length).to.be(1);
    });

    it("should update the page when the search form announces a search", function(done) {
      var searchFormEl = $('.component.search-form').parent(),
          searchForm = _.filter(s.views, function(v) {
            return v.$el[0] === searchFormEl[0];
          })[0];

      s.searchData.on('change', function() {
        expect($('.component.results').html()).to.contain('srchr');
        expect($('.component.recent-searches').html()).to.contain('srchr');
        expect(navigatedTo).to.be('search/srchr');
        done();
      });

      searchForm.trigger('search', 'srchr');
    });

    describe("#update", function() {
      it("should update the page using the new search term", function(done) {
        var dfd = s.update({ term : 'testing' });

        dfd.then(function() {
          expect($('.component.results').html()).to.contain('testing');
          expect($('.component.recent-searches').html()).to.contain('testing');
          expect(navigatedTo).to.be('search/testing');
          done();
        });
      });
    });

  });

});
