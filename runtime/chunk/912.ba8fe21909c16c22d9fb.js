"use strict";(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[912],{83327:function(t,e,n){n.d(e,{B:function(){return c},S:function(){return a}});var o=n(65040),i=n(20637);function l(t){if("highlightAll"in i.default==0)return void("hljs"in window!=1&&(0,o.loadJS)("//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js",{onload:a}));let e=t;if("pre"===t.tagName.toLowerCase()&&(e=t.querySelector("code"),!e)){const n=document.createElement("code");n.innerHTML=t.innerHTML,t.innerHTML="",t.appendChild(n),e=t.querySelector("code")}if(!e)return console.log("pre code is null"),void console.log(t);e.id||(e.id="code-"+(0,o.randomStr)(4)),e.classList.contains("language-mysql")&&(e.classList.remove("language-mysql"),e.classList.add("language-sql")),e.hasAttribute("data-highlight")?"false"!=e.getAttribute("data-highlight")&&r(e):r(e)}function r(t){t.hasAttribute("highlighted")||(t.setAttribute("highlighted","true"),i.default.highlightElement?i.default.highlightElement(t):i.default.highlightBlock(t))}function a(){document.querySelectorAll("pre").forEach(l)}function c(){Promise.resolve().then(n.t.bind(n,96624,23)).then((t=>{let{default:e}=t;e.all(Array.from(document.querySelectorAll("pre"))).each((function(t){t.getAttribute("id")||t.setAttribute("id",(0,o.randomStr)(4));let e=t.querySelector(".copy-code-button"),n=!1;if(!e){n=!0,e=document.createElement("button"),e.className="copy-code-button",e.type="button";const o=t.innerText;e.setAttribute("data-clipboard-text",o),e.setAttribute("title","Copy code block");const i=document.createElement("span");i.innerText="Copy",e.appendChild(i)}e.onclick=function(e){const n=document.getElementById(t.getAttribute("id"));(0,o.copyTextToClipboard)(n.textContent.replace(/(Copy|Copied)$/gm,""),e).then((()=>{e.target.textContent="Copied"})).finally((()=>{window.setTimeout((function(){e.target.textContent="Copy"}),2e3)})).catch(console.error)},n&&t.appendChild(e)}))}))}"undefined"!=typeof window&&"undefined"!=typeof document&&("loading"!==document.readyState?document.addEventListener("scroll",a):document.addEventListener("DOMContentLoaded",a))},76912:function(t,e,n){n.r(e);var o=n(67294),i=n(65040),l=n(83327);class r extends o.Component{constructor(t){super(t)}componentDidMount(){l.S()}componentWillUnmount(){}render(){const t={};return this.props.lang&&(t.className="hljs language-"+this.getLang()),this.props["data-highlight"]&&(t["data-highlight"]=String(this.props["data-highlight"])),o.createElement("pre",{id:this.props.id||"pre-"+(0,i.randomStr)(3),className:this.props.className},o.createElement("code",t,this.props.children),o.createElement("button",{className:"copy-code-button",type:"button",title:"Copy code block","data-clipboard-text":this.props.children},o.createElement("span",null,"Copy")))}getLang(){const{lang:t}=this.props,e={js:"javascript",kt:"kotlin",ts:"typescript",mysql:"sql"};return t in e?e[t]:t}}e.default=r}}]);