({
  baseUrl : 'app',
  dir : 'prod',
  paths : {
    lib : '../lib',
    plugins : '../lib/plugins',
    app : '.',

    jquery : '../lib/jquery',
    underscore : '../lib/underscore',
    backbone : '../lib/backbone',

    use : '../lib/plugins/use',
    text : '../lib/plugins/text'
  },

  use : {
    underscore : {
      attach : '_'
    },
    backbone : {
      deps : [ 'use!underscore', 'jquery' ],
      attach : [ 'Backbone' ]
    }
  },

  modules : [
    {
      name : 'app/main'
    }
  ]
})
