(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d051165"],{"0004":function(t,e,r){"use strict";var s=r("26e9"),n=r.n(s);n.a},"159b":function(t,e,r){var s=r("da84"),n=r("fdbc"),i=r("17c2"),a=r("9112");for(var o in n){var l=s[o],u=l&&l.prototype;if(u&&u.forEach!==i)try{a(u,"forEach",i)}catch(c){u.forEach=i}}},"17c2":function(t,e,r){"use strict";var s=r("b727").forEach,n=r("b301");t.exports=n("forEach")?function(t){return s(this,t,arguments.length>1?arguments[1]:void 0)}:[].forEach},"26e9":function(t,e,r){},5157:function(t,e,r){t.exports=r.p+"media/dessert.d6819f9f.mp3"},6134:function(t,e,r){"use strict";var s=r("db14"),n=r.n(s);n.a},"65f0":function(t,e,r){var s=r("861d"),n=r("e8b5"),i=r("b622"),a=i("species");t.exports=function(t,e){var r;return n(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!n(r.prototype)?s(r)&&(r=r[a],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},"7d36":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{position:"absolute",left:"0",top:"0",width:"100%",height:"100%",overflow:"hidden"}},[r("div",{staticClass:"background",style:t.mapStyle}),r("button",{on:{click:function(e){return t.$router.push("/")}}},[t._v("EXIT")]),t._v(" "+t._s(t.$store.state.bullets.length)+" "),r("player",{staticClass:"player",staticStyle:{position:"absolute"},style:{left:"50%",top:"50%"},attrs:{id:"player",player:t.$store.state}}),t._l(t.filter(t.$store.state.server.players),(function(e){return r("player",{key:e.username,staticClass:"player",staticStyle:{position:"absolute"},style:{left:e.x+t.px-t.$store.state.x+"px",top:e.y+t.py-t.$store.state.y+"px"},attrs:{player:e}})})),t._l(t.$store.state.bullets,(function(e,s){return r("bullet",{key:e.id,staticStyle:{position:"absolute"},style:{left:e.x+t.px-t.$store.state.x+"px",top:e.y+t.py-t.$store.state.y+"px"},attrs:{index:s,parent:t.$store.state.bullets,bullet:e}})})),r("div",{staticStyle:{position:"fixed",bottom:"50px",left:"50px"}},[t._v(" x: "+t._s(t.$store.state.x)+", y: "+t._s(t.$store.state.y)+" - "+t._s(t.$store.state.server.users)+" players online ")])],2)},n=[],i=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"player",style:t.playerStyle},[r("span",{staticStyle:{"margin-left":"-4px","margin-top":"-25px",width:"100%","text-align":"center",display:"block"}},[t._v(" "+t._s(t.player.username||"Guest")+" ")])])},a=[],o={props:["player","x","y"],computed:{playerStyle:function(){var t=0;"right"===this.player.direction?t=90:"down"===this.player.direction?t=180:"left"===this.player.direction&&(t=270);var e=this.player.jumping?1.5:1;return{transform:"rotate("+t+"deg) scale("+e+")"}}},data:function(){return{}}},l=o,u=(r("0004"),r("2877")),c=Object(u["a"])(l,i,a,!1,null,"41e1206c",null),p=c.exports,f=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"bullet"})},d=[],y=(r("159b"),{props:["bullet","parent","index"],created:function(){var t=this,e=8;setInterval((function(){var r=40;if("up"===t.bullet.direction?t.bullet.y-=r:"down"===t.bullet.direction?t.bullet.y+=r:"left"===t.bullet.direction?t.bullet.x-=r:"right"===t.bullet.direction&&(t.bullet.x+=r),e<=0){var s=[];t.$store.state.bullets.forEach((function(e){e.uniq!==t.bullet.uniq&&s.push(e)})),t.$store.state.bullets=s}e--}),15)}}),h=y,b=(r("e39c"),Object(u["a"])(h,f,d,!1,null,"bf07173a",null)),v=b.exports,x={components:{Player:p,Bullet:v},data:function(){return{step:5,px:0,py:0}},methods:{filter:function(t){return delete t[this.$store.state.username],t},walk:function(){var t=this;setTimeout((function(){var e=t.step;t.$store.state.run&&(e*=2),t.$store.state.walking&&("up"===t.$store.state.direction?t.$store.state.y-=e:"down"===t.$store.state.direction?t.$store.state.y+=e:"left"===t.$store.state.direction?t.$store.state.x-=e:"right"===t.$store.state.direction&&(t.$store.state.x+=e)),t.walk()}),10)}},mounted:function(){this.$store.state.playing=!0,this.px=document.getElementById("player").getBoundingClientRect().left,this.py=document.getElementById("player").getBoundingClientRect().top},computed:{mapStyle:function(){return{left:-this.$store.state.x+this.px-1e3+"px",top:-this.$store.state.y+this.py-1e3+"px"}}},created:function(){var t=new Audio(r("5157"));t.loop=!0,t.play(),this.walk()}},m=x,$=(r("6134"),Object(u["a"])(m,s,n,!1,null,"9e04e97a",null));e["default"]=$.exports},a501:function(t,e,r){},b301:function(t,e,r){"use strict";var s=r("d039");t.exports=function(t,e){var r=[][t];return!r||!s((function(){r.call(null,e||function(){throw 1},1)}))}},b727:function(t,e,r){var s=r("f8c2"),n=r("44ad"),i=r("7b0b"),a=r("50c4"),o=r("65f0"),l=[].push,u=function(t){var e=1==t,r=2==t,u=3==t,c=4==t,p=6==t,f=5==t||p;return function(d,y,h,b){for(var v,x,m=i(d),$=n(m),S=s(y,h,3),g=a($.length),L=0,w=b||o,_=e?w(d,g):r?w(d,0):void 0;g>L;L++)if((f||L in $)&&(v=$[L],x=S(v,L,m),t))if(e)_[L]=x;else if(x)switch(t){case 3:return!0;case 5:return v;case 6:return L;case 2:l.call(_,v)}else if(c)return!1;return p?-1:u||c?c:_}};t.exports={forEach:u(0),map:u(1),filter:u(2),some:u(3),every:u(4),find:u(5),findIndex:u(6)}},db14:function(t,e,r){},e39c:function(t,e,r){"use strict";var s=r("a501"),n=r.n(s);n.a},e8b5:function(t,e,r){var s=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==s(t)}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-2d051165.de45326a.js.map