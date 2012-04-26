((function(){var a=this,b=a.Backbone,c=Array.prototype.slice,d=Array.prototype.splice,e;typeof exports!="undefined"?e=exports:e=a.Backbone={},e.VERSION="0.9.2";var f=a._;!f&&typeof require!="undefined"&&(f=require("underscore"));var g=a.jQuery||a.Zepto||a.ender;e.setDomLibrary=function(a){g=a},e.noConflict=function(){return a.Backbone=b,this},e.emulateHTTP=!1,e.emulateJSON=!1;var h=/\s+/,i=e.Events={on:function(a,b,c){var d,e,f,g,i;if(!b)return this;a=a.split(h),d=this._callbacks||(this._callbacks={});while(e=a.shift())i=d[e],f=i?i.tail:{},f.next=g={},f.context=c,f.callback=b,d[e]={tail:g,next:i?i.next:f};return this},off:function(a,b,c){var d,e,g,i,j,k;if(!(e=this._callbacks))return;if(!(a||b||c))return delete this._callbacks,this;a=a?a.split(h):f.keys(e);while(d=a.shift()){g=e[d],delete e[d];if(!g||!b&&!c)continue;i=g.tail;while((g=g.next)!==i)j=g.callback,k=g.context,(b&&j!==b||c&&k!==c)&&this.on(d,j,k)}return this},trigger:function(a){var b,d,e,f,g,i,j;if(!(e=this._callbacks))return this;i=e.all,a=a.split(h),j=c.call(arguments,1);while(b=a.shift()){if(d=e[b]){f=d.tail;while((d=d.next)!==f)d.callback.apply(d.context||this,j)}if(d=i){f=d.tail,g=[b].concat(j);while((d=d.next)!==f)d.callback.apply(d.context||this,g)}}return this}};i.bind=i.on,i.unbind=i.off;var j=e.Model=function(a,b){var c;a||(a={}),b&&b.parse&&(a=this.parse(a));if(c=A(this,"defaults"))a=f.extend({},c,a);b&&b.collection&&(this.collection=b.collection),this.attributes={},this._escapedAttributes={},this.cid=f.uniqueId("c"),this.changed={},this._silent={},this._pending={},this.set(a,{silent:!0}),this.changed={},this._silent={},this._pending={},this._previousAttributes=f.clone(this.attributes),this.initialize.apply(this,arguments)};f.extend(j.prototype,i,{changed:null,_silent:null,_pending:null,idAttribute:"id",initialize:function(){},toJSON:function(a){return f.clone(this.attributes)},get:function(a){return this.attributes[a]},escape:function(a){var b;if(b=this._escapedAttributes[a])return b;var c=this.get(a);return this._escapedAttributes[a]=f.escape(c==null?"":""+c)},has:function(a){return this.get(a)!=null},set:function(a,b,c){var d,e,g;f.isObject(a)||a==null?(d=a,c=b):(d={},d[a]=b),c||(c={});if(!d)return this;d instanceof j&&(d=d.attributes);if(c.unset)for(e in d)d[e]=void 0;if(!this._validate(d,c))return!1;this.idAttribute in d&&(this.id=d[this.idAttribute]);var h=c.changes={},i=this.attributes,k=this._escapedAttributes,l=this._previousAttributes||{};for(e in d){g=d[e];if(!f.isEqual(i[e],g)||c.unset&&f.has(i,e))delete k[e],(c.silent?this._silent:h)[e]=!0;c.unset?delete i[e]:i[e]=g,!f.isEqual(l[e],g)||f.has(i,e)!=f.has(l,e)?(this.changed[e]=g,c.silent||(this._pending[e]=!0)):(delete this.changed[e],delete this._pending[e])}return c.silent||this.change(c),this},unset:function(a,b){return(b||(b={})).unset=!0,this.set(a,null,b)},clear:function(a){return(a||(a={})).unset=!0,this.set(f.clone(this.attributes),a)},fetch:function(a){a=a?f.clone(a):{};var b=this,c=a.success;return a.success=function(d,e,f){if(!b.set(b.parse(d,f),a))return!1;c&&c(b,d)},a.error=e.wrapError(a.error,b,a),(this.sync||e.sync).call(this,"read",this,a)},save:function(a,b,c){var d,g;f.isObject(a)||a==null?(d=a,c=b):(d={},d[a]=b),c=c?f.clone(c):{};if(c.wait){if(!this._validate(d,c))return!1;g=f.clone(this.attributes)}var h=f.extend({},c,{silent:!0});if(d&&!this.set(d,c.wait?h:c))return!1;var i=this,j=c.success;c.success=function(a,b,e){var g=i.parse(a,e);c.wait&&(delete c.wait,g=f.extend(d||{},g));if(!i.set(g,c))return!1;j?j(i,a):i.trigger("sync",i,a,c)},c.error=e.wrapError(c.error,i,c);var k=this.isNew()?"create":"update",l=(this.sync||e.sync).call(this,k,this,c);return c.wait&&this.set(g,h),l},destroy:function(a){a=a?f.clone(a):{};var b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};if(this.isNew())return d(),!1;a.success=function(e){a.wait&&d(),c?c(b,e):b.trigger("sync",b,e,a)},a.error=e.wrapError(a.error,b,a);var g=(this.sync||e.sync).call(this,"delete",this,a);return a.wait||d(),g},url:function(){var a=A(this,"urlRoot")||A(this.collection,"url")||B();return this.isNew()?a:a+(a.charAt(a.length-1)=="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a,b){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(a){a||(a={});var b=this._changing;this._changing=!0;for(var c in this._silent)this._pending[c]=!0;var d=f.extend({},a.changes,this._silent);this._silent={};for(var c in d)this.trigger("change:"+c,this,this.get(c),a);if(b)return this;while(!f.isEmpty(this._pending)){this._pending={},this.trigger("change",this,a);for(var c in this.changed){if(this._pending[c]||this._silent[c])continue;delete this.changed[c]}this._previousAttributes=f.clone(this.attributes)}return this._changing=!1,this},hasChanged:function(a){return arguments.length?f.has(this.changed,a):!f.isEmpty(this.changed)},changedAttributes:function(a){if(!a)return this.hasChanged()?f.clone(this.changed):!1;var b,c=!1,d=this._previousAttributes;for(var e in a){if(f.isEqual(d[e],b=a[e]))continue;(c||(c={}))[e]=b}return c},previous:function(a){return!arguments.length||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return f.clone(this._previousAttributes)},isValid:function(){return!this.validate(this.attributes)},_validate:function(a,b){if(b.silent||!this.validate)return!0;a=f.extend({},this.attributes,a);var c=this.validate(a,b);return c?(b&&b.error?b.error(this,c,b):this.trigger("error",this,c,b),!1):!0}});var k=e.Collection=function(a,b){b||(b={}),b.model&&(this.model=b.model),b.comparator&&(this.comparator=b.comparator),this._reset(),this.initialize.apply(this,arguments),a&&this.reset(a,{silent:!0,parse:b.parse})};f.extend(k.prototype,i,{model:j,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},add:function(a,b){var c,e,g,h,i,j,k={},l={},m=[];b||(b={}),a=f.isArray(a)?a.slice():[a];for(c=0,g=a.length;c<g;c++){if(!(h=a[c]=this._prepareModel(a[c],b)))throw new Error("Can't add an invalid model to a collection");i=h.cid,j=h.id;if(k[i]||this._byCid[i]||j!=null&&(l[j]||this._byId[j])){m.push(c);continue}k[i]=l[j]=h}c=m.length;while(c--)a.splice(m[c],1);for(c=0,g=a.length;c<g;c++)(h=a[c]).on("all",this._onModelEvent,this),this._byCid[h.cid]=h,h.id!=null&&(this._byId[h.id]=h);this.length+=g,e=b.at!=null?b.at:this.models.length,d.apply(this.models,[e,0].concat(a)),this.comparator&&this.sort({silent:!0});if(b.silent)return this;for(c=0,g=this.models.length;c<g;c++){if(!k[(h=this.models[c]).cid])continue;b.index=c,h.trigger("add",h,this,b)}return this},remove:function(a,b){var c,d,e,g;b||(b={}),a=f.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++){g=this.getByCid(a[c])||this.get(a[c]);if(!g)continue;delete this._byId[g.id],delete this._byCid[g.cid],e=this.indexOf(g),this.models.splice(e,1),this.length--,b.silent||(b.index=e,g.trigger("remove",g,this,b)),this._removeReference(g)}return this},push:function(a,b){return a=this._prepareModel(a,b),this.add(a,b),a},pop:function(a){var b=this.at(this.length-1);return this.remove(b,a),b},unshift:function(a,b){return a=this._prepareModel(a,b),this.add(a,f.extend({at:0},b)),a},shift:function(a){var b=this.at(0);return this.remove(b,a),b},get:function(a){return a==null?void 0:this._byId[a.id!=null?a.id:a]},getByCid:function(a){return a&&this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return f.isEmpty(a)?[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return!1;return!0})},sort:function(a){a||(a={});if(!this.comparator)throw new Error("Cannot sort a set without a comparator");var b=f.bind(this.comparator,this);return this.comparator.length==1?this.models=this.sortBy(b):this.models.sort(b),a.silent||this.trigger("reset",this,a),this},pluck:function(a){return f.map(this.models,function(b){return b.get(a)})},reset:function(a,b){a||(a=[]),b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c]);return this._reset(),this.add(a,f.extend({silent:!0},b)),b.silent||this.trigger("reset",this,b),this},fetch:function(a){a=a?f.clone(a):{},a.parse===undefined&&(a.parse=!0);var b=this,c=a.success;return a.success=function(d,e,f){b[a.add?"add":"reset"](b.parse(d,f),a),c&&c(b,d)},a.error=e.wrapError(a.error,b,a),(this.sync||e.sync).call(this,"read",this,a)},create:function(a,b){var c=this;b=b?f.clone(b):{},a=this._prepareModel(a,b);if(!a)return!1;b.wait||c.add(a,b);var d=b.success;return b.success=function(e,f,g){b.wait&&c.add(e,b),d?d(e,f):e.trigger("sync",a,f,b)},a.save(null,b),a},parse:function(a,b){return a},chain:function(){return f(this.models).chain()},_reset:function(a){this.length=0,this.models=[],this._byId={},this._byCid={}},_prepareModel:function(a,b){b||(b={});if(a instanceof j)a.collection||(a.collection=this);else{var c=a;b.collection=this,a=new this.model(c,b),a._validate(a.attributes,b)||(a=!1)}return a},_removeReference:function(a){this==a.collection&&delete a.collection,a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){if(a!="add"&&a!="remove"||c==this)a=="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],this._byId[b.id]=b),this.trigger.apply(this,arguments);else return}});var l=["forEach","each","map","reduce","reduceRight","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","sortBy","sortedIndex","toArray","size","first","initial","rest","last","without","indexOf","shuffle","lastIndexOf","isEmpty","groupBy"];f.each(l,function(a){k.prototype[a]=function(){return f[a].apply(f,[this.models].concat(f.toArray(arguments)))}});var m=e.Router=function(a){a||(a={}),a.routes&&(this.routes=a.routes),this._bindRoutes(),this.initialize.apply(this,arguments)},n=/:\w+/g,o=/\*\w+/g,p=/[-[\]{}()+?.,\\^$|#\s]/g;f.extend(m.prototype,i,{initialize:function(){},route:function(a,b,c){return e.history||(e.history=new q),f.isRegExp(a)||(a=this._routeToRegExp(a)),c||(c=this[b]),e.history.route(a,f.bind(function(d){var f=this._extractParameters(a,d);c&&c.apply(this,f),this.trigger.apply(this,["route:"+b].concat(f)),e.history.trigger("route",this,b,f)},this)),this},navigate:function(a,b){e.history.navigate(a,b)},_bindRoutes:function(){if(!this.routes)return;var a=[];for(var b in this.routes)a.unshift([b,this.routes[b]]);for(var c=0,d=a.length;c<d;c++)this.route(a[c][0],a[c][1],this[a[c][1]])},_routeToRegExp:function(a){return a=a.replace(p,"\\$&").replace(n,"([^/]+)").replace(o,"(.*?)"),new RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var q=e.History=function(){this.handlers=[],f.bindAll(this,"checkUrl")},r=/^[#\/]/,s=/msie [\w.]+/;q.started=!1,f.extend(q.prototype,i,{interval:50,getHash:function(a){var b=a?a.location:window.location,c=b.href.match(/#(.*)$/);return c?c[1]:""},getFragment:function(a,b){if(a==null)if(this._hasPushState||b){a=window.location.pathname;var c=window.location.search;c&&(a+=c)}else a=this.getHash();return a.indexOf(this.options.root)||(a=a.substr(this.options.root.length)),a.replace(r,"")},start:function(a){if(q.started)throw new Error("Backbone.history has already been started");q.started=!0,this.options=f.extend({},{root:"/"},this.options,a),this._wantsHashChange=this.options.hashChange!==!1,this._wantsPushState=!!this.options.pushState,this._hasPushState=!!(this.options.pushState&&window.history&&window.history.pushState);var b=this.getFragment(),c=document.documentMode,d=s.exec(navigator.userAgent.toLowerCase())&&(!c||c<=7);d&&(this.iframe=g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(b)),this._hasPushState?g(window).bind("popstate",this.checkUrl):this._wantsHashChange&&"onhashchange"in window&&!d?g(window).bind("hashchange",this.checkUrl):this._wantsHashChange&&(this._checkUrlInterval=setInterval(this.checkUrl,this.interval)),this.fragment=b;var e=window.location,h=e.pathname==this.options.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!h)return this.fragment=this.getFragment(null,!0),window.location.replace(this.options.root+"#"+this.fragment),!0;this._wantsPushState&&this._hasPushState&&h&&e.hash&&(this.fragment=this.getHash().replace(r,""),window.history.replaceState({},document.title,e.protocol+"//"+e.host+this.options.root+this.fragment));if(!this.options.silent)return this.loadUrl()},stop:function(){g(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl),clearInterval(this._checkUrlInterval),q.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(a){var b=this.getFragment();b==this.fragment&&this.iframe&&(b=this.getFragment(this.getHash(this.iframe)));if(b==this.fragment)return!1;this.iframe&&this.navigate(b),this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a),c=f.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),!0});return c},navigate:function(a,b){if(!q.started)return!1;if(!b||b===!0)b={trigger:b};var c=(a||"").replace(r,"");if(this.fragment==c)return;this._hasPushState?(c.indexOf(this.options.root)!=0&&(c=this.options.root+c),this.fragment=c,window.history[b.replace?"replaceState":"pushState"]({},document.title,c)):this._wantsHashChange?(this.fragment=c,this._updateHash(window.location,c,b.replace),this.iframe&&c!=this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,c,b.replace))):window.location.assign(this.options.root+a),b.trigger&&this.loadUrl(a)},_updateHash:function(a,b,c){c?a.replace(a.toString().replace(/(javascript:|#).*$/,"")+"#"+b):a.hash=b}});var t=e.View=function(a){this.cid=f.uniqueId("view"),this._configure(a||{}),this._ensureElement(),this.initialize.apply(this,arguments),this.delegateEvents()},u=/^(\S+)\s*(.*)$/,v=["model","collection","el","id","attributes","className","tagName"];f.extend(t.prototype,i,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){return this.$el.remove(),this},make:function(a,b,c){var d=document.createElement(a);return b&&g(d).attr(b),c&&g(d).html(c),d},setElement:function(a,b){return this.$el&&this.undelegateEvents(),this.$el=a instanceof g?a:g(a),this.el=this.$el[0],b!==!1&&this.delegateEvents(),this},delegateEvents:function(a){if(!a&&!(a=A(this,"events")))return;this.undelegateEvents();for(var b in a){var c=a[b];f.isFunction(c)||(c=this[a[b]]);if(!c)throw new Error('Method "'+a[b]+'" does not exist');var d=b.match(u),e=d[1],g=d[2];c=f.bind(c,this),e+=".delegateEvents"+this.cid,g===""?this.$el.bind(e,c):this.$el.delegate(g,e,c)}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&(a=f.extend({},this.options,a));for(var b=0,c=v.length;b<c;b++){var d=v[b];a[d]&&(this[d]=a[d])}this.options=a},_ensureElement:function(){if(!this.el){var a=A(this,"attributes")||{};this.id&&(a.id=this.id),this.className&&(a["class"]=this.className),this.setElement(this.make(this.tagName,a),!1)}else this.setElement(this.el,!1)}});var w=function(a,b){var c=z(this,a,b);return c.extend=this.extend,c};j.extend=k.extend=m.extend=t.extend=w;var x={create:"POST",update:"PUT","delete":"DELETE",read:"GET"};e.sync=function(a,b,c){var d=x[a];c||(c={});var h={type:d,dataType:"json"};return c.url||(h.url=A(b,"url")||B()),!c.data&&b&&(a=="create"||a=="update")&&(h.contentType="application/json",h.data=JSON.stringify(b.toJSON())),e.emulateJSON&&(h.contentType="application/x-www-form-urlencoded",h.data=h.data?{model:h.data}:{}),e.emulateHTTP&&(d==="PUT"||d==="DELETE")&&(e.emulateJSON&&(h.data._method=d),h.type="POST",h.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d)}),h.type!=="GET"&&!e.emulateJSON&&(h.processData=!1),g.ajax(f.extend(h,c))},e.wrapError=function(a,b,c){return function(d,e){e=d===b?e:d,a?a(b,e,c):b.trigger("error",b,e,c)}};var y=function(){},z=function(a,b,c){var d;return b&&b.hasOwnProperty("constructor")?d=b.constructor:d=function(){a.apply(this,arguments)},f.extend(d,a),y.prototype=a.prototype,d.prototype=new y,b&&f.extend(d.prototype,b),c&&f.extend(d,c),d.prototype.constructor=d,d.__super__=a.prototype,d},A=function(a,b){return!a||!a[b]?null:f.isFunction(a[b])?a[b]():a[b]},B=function(){throw new Error('A "url" property or function must be specified')}})).call(this)