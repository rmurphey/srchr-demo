var item = require('server/models/item'),
    r = require('request'),
    q = require('q');

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
          url : 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ef4a854bc88fb51ca16b6d96ac1d078e&tags={term}&format=json&nojsoncallback=1',
          process : function(data) {
            return JSON.parse(data).photos.photo.map(function(e) {
              return new item.flickr(e);
            });
          }
        }
      },
      error = 0,
      success = 0,
      typesList = Object.keys(types),
      items = [];

      typesList.forEach(function(type) {
        console.log('GOT HERE', type);
        var handle = function(error, response, body) {
          if (error || response.statusCode != 200) {
            error += 1;
          } else {
            success += 1;
            items = items.concat(types[type].process(body));
          }

          if (success === typesList.length) {
            dfd.resolve({ items : items });
          }
        };

        var url = types[type].url.replace('{term}', escape(term));

        r(url, handle);
      });


  return dfd.promise;
};
