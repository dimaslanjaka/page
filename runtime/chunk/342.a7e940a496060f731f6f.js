"use strict";(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[342],{32790:function(t,n,e){var o=e(70850),r={animation:"animationend",OAnimation:"oAnimationEnd",MozAnimation:"animationend",WebkitAnimation:"webkitAnimationEnd"};n.Z=function(){if(o.Z){var t,n=document.createElement("div").style;for(t in r)if(void 0!==n[t])return r[t]}}},81011:function(t,n,e){function o(t,n){return(t="function"==typeof t?t():t)||n}e.d(n,{Z:function(){return o}})},15017:function(t,n,e){e.d(n,{Z:function(){return d}});var o=e(87462),r=e(58198),i=e(36566),u=e(81428),f=e(34264),l=e(86543),a=e(24188);function d(t,n,e){void 0===e&&(e=!0);var d={top:0,left:0},c=null;if("fixed"===(0,u.Z)(t,"position"))c=t.getBoundingClientRect();else{if(n=n||function(t){for(var n=(0,r.Z)(t),e=null==t?void 0:t.offsetParent;e&&"html"!==(0,i.Z)(t)&&"static"===(0,u.Z)(e,"position");)e=e.offsetParent;return e||n.documentElement}(t),c=(0,f.Z)(t),"html"!==(0,i.Z)(n)){var p=(0,f.Z)(n);p&&(d.top=p.top,d.left=p.left)}d.top+=parseInt((0,u.Z)(n,"borderTopWidth"),10)-(0,l.Z)(n)||0,d.left+=parseInt((0,u.Z)(n,"borderLeftWidth"),10)-(0,a.Z)(n)||0}if(c){var m=e&&parseInt((0,u.Z)(t,"marginTop"),10)||0,s=e&&parseInt((0,u.Z)(t,"marginLeft"),10)||0;return(0,o.Z)({},c,{top:c.top-d.top-m,left:c.left-d.left-s})}return null}},28470:function(t,n,e){e.d(n,{Z:function(){return i}});var o,r=e(70850);function i(t){if((void 0===o||t)&&r.Z){var n=document.createElement("div"),e=document.body;n.style.position="absolute",n.style.top="-9999px",n.style.width="50px",n.style.height="50px",n.style.overflow="scroll",e.appendChild(n),o=n.offsetWidth-n.clientWidth,e.removeChild(n)}return o}},81428:function(t,n,e){e.d(n,{Z:function(){return f}});var o=e(7120),r=/^-ms-/,i=function(t){if(!t)throw new TypeError("No Element passed to `getComputedStyle()`");var n=t.ownerDocument;return"defaultView"in n?n.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):window.getComputedStyle(t,null):null},u=e(22703);function f(t,n){if(n){var e=t.style[(l=n,(0,o._A)(l.replace(r,"ms-")))];if(e)return e;var f=i(t);if(f)return f.getPropertyValue((0,u.Z)(n))}var l;return t.style||i(t)}},4338:function(t,n,e){e(48130),e(97356),e(13136),e(6462),e(32790),e(70850),e(26171),e(34264),e(15017),e(28470),e(43025),e(51312),e(59645)},36566:function(t,n,e){function o(t){var n;return(null==t?void 0:t.nodeName)&&(null==t||null===(n=t.nodeName)||void 0===n?void 0:n.toLowerCase())}e.d(n,{Z:function(){return o}})},30845:function(t,n){var e=Number.isNaN||function(t){return"number"==typeof t&&t!=t};function o(t,n){if(t.length!==n.length)return!1;for(var o=0;o<t.length;o++)if(!((r=t[o])===(i=n[o])||e(r)&&e(i)))return!1;var r,i;return!0}n.Z=function(t,n){var e;void 0===n&&(n=o);var r,i=[],u=!1;return function(){for(var o=[],f=0;f<arguments.length;f++)o[f]=arguments[f];return u&&e===this&&n(o,i)||(r=t.apply(this,o),u=!0,e=this,i=o),r}}}}]);