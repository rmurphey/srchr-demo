module.exports = {
  twitter : function(entry) {
    return {
      type : 'twitter',
      title : '',
      content : entry.text,
      thumb : entry.profile_image_url,
      link : 'http://twitter.com/' + entry.from_user + '/status/' + entry.id_str
    };
  },

  youtube : function(entry) {
    return {
      type  : 'video',
      title : entry.title.$t,
      content : entry.media$group.media$description.$t,
      thumb : entry.media$group.media$thumbnail[0].url,
      link  : entry.link.filter(function(link) {
        return link.rel === 'alternate';
      })[0].href
    };
  },

  flickr : function(entry) {
    function thumb() {
      var tpl ='http://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_t.jpg';
      return tpl.replace('{farm-id}', entry.farm)
                .replace('{server-id}', entry.server)
                .replace('{id}', entry.id)
                .replace('{secret}', entry.secret);
    }

    function url() {
      var tpl = 'http://www.flickr.com/photos/{user-id}/{photo-id}';
      return tpl.replace('{user-id}', entry.owner)
                .replace('{photo-id}', entry.id);
    }

    return {
      type : 'image',
      content : '',
      title : entry.title,
      thumb : thumb(),
      link : url()
    };
  }
};
