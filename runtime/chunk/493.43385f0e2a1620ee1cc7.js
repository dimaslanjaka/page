"use strict";(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[493],{86493:function(o,n,e){function t(){const o=window.location.hash.substring(1).replace(/[=]/gi,"");if(o.length>0){const n=document.querySelector(o);if(n){const o=n.getBoundingClientRect().top;"number"==typeof o&&window.scrollTo({top:o,behavior:"smooth"})}}return o.length>0}e.r(n),e.d(n,{restoreScrollPosition:function(){return i},saveScrollPosition:function(){return c},scrollToHash:function(){return t}});const c=function(){let o;void 0!==window.pageYOffset?o=window.pageYOffset:void 0!==document.compatMode&&"BackCompat"!=document.compatMode?o=document.documentElement.scrollTop:void 0!==document.body&&(o=document.body.scrollTop),document.cookie="scrollTop="+o+"URL="+window.location.href};window.onbeforeunload=c;const i=function(){if(!t()&&document.cookie.includes(window.location.href)&&null!=document.cookie.match(/scrollTop=([^;]+)(;|$)/)){const o=document.cookie.match(/scrollTop=([^;]+)(;|$)/);document.documentElement.scrollTop=parseInt(o[1]),document.body.scrollTop=parseInt(o[1])}};window.onload=i}}]);