var r = require('request'),
    q = require('q'),

    item = require('./models/item'),
    config = require('./config.js');

module.exports = function(term) {
  var dfd = q.defer(),
      types = {
        youtube : {
          url : 'https://gdata.youtube.com/feeds/api/videos?q={term}&alt=json',
          process : function(data) {
            return JSON.parse(data).feed.entry.map(function(e) {
              return new item.youtube(e);
            });
          }
        },
        flickr : {
          url : 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key={api_key}&tags={term}&format=json&nojsoncallback=1'.replace('{api_key}', config.flickr),
          process : function(data) {
            data = JSON.parse(data);

            if (data.photos && data.photos.photo) {
              return data.photos.photo.map(function(e) {
                return new item.flickr(e);
              });
            }

            return [];
          }
        }
      },
      error = 0,
      success = 0,
      typesList = Object.keys(types),
      items = [];

      typesList.forEach(function(type) {
        var handle = function(error, response, body) {
          if (error || response.statusCode != 200) {
            error += 1;
          } else {
            success += 1;
            items = items.concat(types[type].process(body));
          }

          if (success === typesList.length) {
            dfd.resolve(items);
          }
        };

        var url = types[type].url.replace('{term}', escape(term));

        r(url, handle);
      });


  return dfd.promise;
};
