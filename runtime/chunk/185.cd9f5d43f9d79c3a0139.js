(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[185,541,110,168],{30767:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return a}});var r=n(67294);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o.apply(this,arguments)}function a(e){return r.createElement("div",o({adsense:"fill",style:{minWidth:"50px"}},e))}},56716:function(e,t,n){"use strict";var r=n(65040),o=n(67294);n(27358);class a extends o.Component{constructor(e){super(e),this.state=Object.assign({slot:"",client:"",format:"auto",style:{},currentSlot:{}},e)}componentDidMount(){window.adsbygoogle||(window.adsbygoogle=[])}render(){const e={"data-ad-slot":this.state.slot,"data-ad-client":"ca-pub-"+this.state.client.replace("ca-pub-",""),"data-ad-format":this.state.format,style:{display:"block",...this.state.style},className:r.arrayDedupe(["adsbygoogle"].concat((this.state.className||"").split(" "))).filter((e=>e.length>0)).join(" ")};return this.state.widthResponsive&&(e["data-full-width-responsive"]=this.state.widthResponsive),/dev/i.test("production")&&(e["data-adtest"]="on"),o.createElement("ins",e)}}t.Z=a},93465:function(e,t,n){"use strict";n.r(t);var r=n(67294),o=n(79655),a=n(65040);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}class s extends r.Component{constructor(e){var t,n,r;super(e),t=this,n="sf",r=a.safelinkInstance,(n=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,"string");if("object"!=typeof r)return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(n))in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r}render(){const{href:e,to:t,...n}=this.props,s=e||t;let l,c=s,u="internal";return"string"==typeof s&&(0,a.isValidHttpUrl)(s)&&(c=this.sf.parseUrl(s),u=c===s?"internal":"external"),l="external"===u?r.createElement("a",i({},n,{href:c,target:"_blank"}),this.props.children):r.createElement(o.rU,i({},n,{to:s}),this.props.children),l}}t.default=s},63465:function(e,t,n){"use strict";var r=n(67294),o=n(93465),a=n(15439),i=n(70929),s=n(92918),l=n(43577),c=n(93428),u=n(56716),f=n(30767);class d extends r.Component{constructor(e){super(e)}componentDidMount(){document.title="Home page - WMI",n(15e3),window.adsense_option||(window.adsense_option={}),window.adsense_option.root=".myHome"}render(){const e=[{icon:"fa-arrow-right-to-bracket",title:"Login",link:"/page/login",desc:r.createElement(r.Fragment,null,"User portal to use any features")},{title:"Moment Timezone playground",icon:"fa-clock",link:"/page/moment-timezone",desc:r.createElement(r.Fragment,null,"Test, format, interval using ",r.createElement(o.default,{href:"https://www.npmjs.com/moment-timezone"},"moment-timezone")," ","module")},{title:"Outbound Page",icon:"fa-person-walking-arrow-right",link:"/page/safelink",desc:r.createElement(r.Fragment,null,"All external links proxied using outbound page using"," ",r.createElement(o.default,{href:"https://www.npmjs.com/safelinkify"},"safelinkify"))},{icon:"fa-code",title:"Auto highlight.js",link:"/page/highlight-js",desc:r.createElement(r.Fragment,null,"Auto syntax highlighting on ",r.createElement("b",null,"<pre><code>")," tag using"," ",r.createElement(o.default,{href:"https://www.npmjs.com/highlight.js"},"highlight.js"))}];return r.createElement("div",{className:"myHome"},r.createElement("header",{id:"header"},r.createElement("div",{className:"intro",id:"intro"},r.createElement("div",{className:"banner"}),r.createElement("div",{className:"overlay",id:"overlay"},r.createElement(a.default,null,r.createElement(i.default,null,r.createElement(s.default,{md:8,mdOffset:2,className:"intro-text"},r.createElement("h1",null,"W",r.createElement("span",null,"M"),"I"),r.createElement("p",null,"Website Management Indonesia is a blog about scripts, tips and tricks, games, software. Covering php, javascript, jquery, mysql, seo, e-commerce and others."),r.createElement("a",{href:"#features",className:"btn btn-custom btn-lg page-scroll"},r.createElement("i",{className:"fa-regular fa-chevron-double-down"})))))))),r.createElement("div",{id:"features",className:"text-center features mt-4"},r.createElement(l.default,{fluid:!0},r.createElement(i.default,{className:"features-item"},r.createElement("div",{className:"section-title"},r.createElement("h2",null,"Features")),e.slice(0,4).map(((e,t)=>r.createElement(s.default,{xs:24,sm:24,md:6,className:"mb-2",key:t+e.title},r.createElement(c.default,{shaded:!0,bordered:!0,bodyFill:!0,className:"pt-4 pb-4"},r.createElement("i",{className:"fa-thin fa-size-large "+e.icon}),r.createElement(c.default,{header:e.title},r.createElement("p",null,e.desc),r.createElement("a",{href:e.link,className:"btn btn-sm btn-custom"},r.createElement("i",{className:"fa-thin fa-arrow-right"}))),r.createElement(f.default,{style:{height:"150px"},format:"auto"})))))))),r.createElement("div",{className:"mt-2 mb-2"},r.createElement(u.Z,{style:{display:"block"},format:"autorelaxed",client:"ca-pub-2188063137129806",slot:"5041245242"})))}}t.default=d},60820:function(e,t,n){"use strict";var r=n(8081),o=n.n(r),a=n(23645),i=n.n(a)()(o());i.push([e.id,".myHome header{display:table;padding:0;position:relative;width:100%;height:420px}.myHome header .intro{background-color:#e5e5e5;height:420px;width:100%}.myHome header .intro .banner{filter:blur(8px);-webkit-filter:blur(8px);height:420px;width:100%;background-image:url(\"//rawcdn.githack.com/dimaslanjaka/dimaslanjaka.github.io/4e6098df3f102e2bd36b33b9055644bccd4faac3/images/PicsArt_09-09-12.12.25%201584x512px.png\");background-size:cover}.myHome header .intro .intro-text{position:absolute;text-align:center;top:50%;left:50%;transform:translate(-62%, -50%);z-index:2;width:80%;height:100%;padding:20px;background-color:#000;background-color:rgba(0,0,0,0.4);color:white}.myHome header .intro .overlay{background:rgba(0,0,0,0.2)}.myHome header .intro h1{font-family:'Raleway', sans-serif;color:#fff;font-size:70px;font-weight:700;text-transform:uppercase;margin-top:0;margin-bottom:10px}.myHome header .intro h1 span{color:#5ca9fb !important}.myHome header .intro h1 span{font-weight:800}.myHome header .intro p{color:#fff;font-size:22px;font-weight:300;line-height:30px;margin:0 auto;margin-bottom:60px}.myHome #features{background:#f6f6f6}.myHome #features i{color:#fff}.myHome #features .fa-size-large{font-size:38px;margin-bottom:20px;transition:all 0.5s;width:100px;height:100px;padding:30px 0;border-radius:50%;background:linear-gradient(to right, #6372ff 0%, #5ca9fb 100%);box-shadow:10px 10px 10px rgba(0,0,0,0.05)}.myHome #features p{text-align:left;height:100px;overflow:'scroll'}.myHome #features .features-item{white-space:pre-wrap}.myHome #features .features-item .rs-panel-header{height:70px}.myHome .section-title{margin-bottom:70px;width:100%}.myHome .section-title h2{position:relative;margin-top:10px;margin-bottom:15px;padding-bottom:15px}.myHome .section-title h2::after{position:absolute;content:'';background:linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);height:4px;width:60px;bottom:0;margin-left:-30px;left:50%}.myHome .section-title p{font-size:18px}.myHome .btn-custom{font-family:'Cera Pro Bold', sans-serif;text-transform:uppercase;color:#fff;background-color:#5ca9fb;background-image:linear-gradient(to right, #5ca9fb 0%, #6372ff 100%);padding:14px 34px;letter-spacing:1px;margin:0;font-size:15px;font-weight:500;border-radius:25px;transition:all 0.5s linear;border:0}@media screen and (max-width: 600px){.myHome header .intro .intro-text{transform:translate(-50%, -50%)}}\n",""]),t.Z=i},73001:function(e,t,n){"use strict";var r=n(22703),o=n(23342);t.Z=function(e,t,n){var a="",i=t;if("string"==typeof t){if(void 0===n)throw new Error("value is undefined");(i={})[t]=n}if("object"==typeof i)for(var s in i)Object.prototype.hasOwnProperty.call(i,s)&&(i[s]||0===i[s]?a+=(0,r.Z)(s)+":"+i[s]+";":(0,o.Z)(e,(0,r.Z)(s)));e.style.cssText+=";"+a}},70850:function(e,t){"use strict";var n=!("undefined"==typeof window||!window.document||!window.document.createElement);t.Z=n},81428:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(7120),o=/^-ms-/,a=function(e){if(!e)throw new TypeError("No Element passed to `getComputedStyle()`");var t=e.ownerDocument;return"defaultView"in t?t.defaultView.opener?e.ownerDocument.defaultView.getComputedStyle(e,null):window.getComputedStyle(e,null):null},i=n(22703);function s(e,t){if(t){var n=e.style[(l=t,(0,r._A)(l.replace(o,"ms-")))];if(n)return n;var s=a(e);if(s)return s.getPropertyValue((0,i.Z)(t))}var l;return e.style||a(e)}},60534:function(e,t,n){"use strict";n.d(t,{Z:function(){return a}});var r=n(70850),o=function(){if(!r.Z)return{};for(var e,t={O:function(e){return"o"+e.toLowerCase()},Moz:function(e){return e.toLowerCase()},Webkit:function(e){return"webkit"+e},ms:function(e){return"MS"+e}},n=Object.keys(t),o=document.createElement("div").style,a="",i=0;i<n.length;i+=1){var s=n[i];if(s+"TransitionProperty"in o){a="-"+s.toLowerCase(),e=t[s]("TransitionEnd");break}}!e&&"transitionProperty"in o&&(e="transitionend"),o=null;var l=function(e){return a+"-"+e};return{end:e,backfaceVisibility:l("backface-visibility"),transform:l("transform"),property:l("transition-property"),timing:l("transition-timing-function"),delay:l("transition-delay"),duration:l("transition-duration")}};function a(){return o().end}},67738:function(e,t,n){"use strict";function r(e,t,n,r){return void 0===r&&(r=!1),e.addEventListener(t,n,r),{off:function(){e.removeEventListener(t,n,r)}}}n.d(t,{Z:function(){return r}})},23342:function(e,t,n){"use strict";function r(e,t){var n,r;null===(n=e.style)||void 0===n||null===(r=n.removeProperty)||void 0===r||r.call(n,t)}function o(e,t){"string"==typeof t?r(e,t):Array.isArray(t)&&t.forEach((function(t){return r(e,t)}))}n.d(t,{Z:function(){return o}})},22703:function(e,t,n){"use strict";var r=n(7120),o=/^ms-/;t.Z=function(e){return(0,r.rs)(e).replace(o,"-ms-")}},7120:function(e,t,n){"use strict";function r(e){return e.replace(/\-(\w)/g,(function(e){return e.slice(1).toUpperCase()}))}function o(e){return e.replace(/([A-Z])/g,"-$1").toLowerCase()}n.d(t,{_A:function(){return r},rs:function(){return o}})},38186:function(e){var t=[],n=[];function r(e,r){if(r=r||{},void 0===e)throw new Error("insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).");var o,a=!0===r.prepend?"prepend":"append",i=void 0!==r.container?r.container:document.querySelector("head"),s=t.indexOf(i);return-1===s&&(s=t.push(i)-1,n[s]={}),void 0!==n[s]&&void 0!==n[s][a]?o=n[s][a]:(o=n[s][a]=function(){var e=document.createElement("style");return e.setAttribute("type","text/css"),e}(),"prepend"===a?i.insertBefore(o,i.childNodes[0]):i.appendChild(o)),65279===e.charCodeAt(0)&&(e=e.substr(1,e.length)),o.styleSheet?o.styleSheet.cssText+=e:o.textContent+=e,o}e.exports=r,e.exports.insertCss=r},15e3:function(e,t,n){"use strict";n.r(t);var r=n(93379),o=n.n(r),a=n(7795),i=n.n(a),s=n(90569),l=n.n(s),c=n(3565),u=n.n(c),f=n(19216),d=n.n(f),m=n(44589),p=n.n(m),h=n(60820),g={};g.styleTagTransform=p(),g.setAttributes=u(),g.insert=l().bind(null,"head"),g.domAPI=i(),g.insertStyleElement=d(),o()(h.Z,g),t.default=h.Z&&h.Z.locals?h.Z.locals:void 0},10434:function(e){function t(){return e.exports=t=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},e.exports.__esModule=!0,e.exports.default=e.exports,t.apply(this,arguments)}e.exports=t,e.exports.__esModule=!0,e.exports.default=e.exports},64836:function(e){e.exports=function(e){return e&&e.__esModule?e:{default:e}},e.exports.__esModule=!0,e.exports.default=e.exports},7071:function(e){e.exports=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o},e.exports.__esModule=!0,e.exports.default=e.exports},94578:function(e,t,n){"use strict";n.d(t,{Z:function(){return o}});var r=n(89611);function o(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,(0,r.Z)(e,t)}},89611:function(e,t,n){"use strict";function r(e,t){return r=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},r(e,t)}n.d(t,{Z:function(){return r}})}}]);