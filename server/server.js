var express   = require('express'),
    fs        = require('fs'),
    _         = require('underscore'),

    search    = require('./search.js'),
    favs      = require('./favorites.js'),

    site      = express.createServer(),
    staticDir = express['static'];

module.exports = function(opts) {
  opts = _.extend({
    port :      4444,
    tests :     true,
    baseDir :   './'
  }, opts || {});

  site.configure(function() {
    [ 'app', 'lib', 'assets', 'tests' ].forEach(function(dir) {
      site.use('/' + dir, staticDir(opts.baseDir + dir));
    });
    site.use(express.bodyParser());
  });

  site.get("/", function(req, res) {
    fs.createReadStream(opts.baseDir + 'app/index.html').pipe(res);
  });

  site.get("/search/:term", function(req, res) {
    var term = req.params.term;

    search(req.params.term).then(
      function(data) {
        res.end(JSON.stringify(data));
      },
      function(statusCode) {
        throw new Error();
      }
    );
  });

  site.post("/favorites/:username", function(req, res) {
    var fav = JSON.parse(req.body.favorite);
    var id = favs.add(fav);
    res.end(JSON.stringify({ id : id }));
  });

  site.put("/favorites/:username/:id", function(req, res) {
    var fav = JSON.parse(req.body.favorite);
    var id = favs.update(req.params.id, fav);
    res.end(JSON.stringify({ id : id }));
  });

  site.delete("/favorites/:username/:id", function(req, res) {
    favs.remove(req.params.id);
    res.end(JSON.stringify({ success : true }));
  });

  site.get("/favorites/:username", function(req, res) {
    res.end(JSON.stringify(favs.get()));
  });

  site.get("/favorites/:username/:id", function(req, res) {
    var fav = favs.get(req.params.id);
    res.end(JSON.stringify(fav));
  });

  if (opts.tests) {
    site.get("/_test", function(req, res) {
      fs.createReadStream(opts.baseDir + 'tests/app/runner.html').pipe(res);
    });
  }

  // Actually listen
  site.listen(opts.port);
  console.log("Serving at http://localhost:" + opts.port);
};
