"use strict";(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[569],{14306:function(t,e,r){r.r(e);var n=r(67294);function o(){return o=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},o.apply(this,arguments)}function i(t,e,r){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}class s extends n.Component{constructor(t){super(t),i(this,"defaultImage","https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"),i(this,"onError",(()=>{this.state.errored||this.setState({src:this.props.fallbackSrc||this.defaultImage,errored:!0})})),this.state={src:t.src||this.defaultImage,errored:!1,mounted:!1}}componentDidMount(){this.setState({mounted:!0})}componentWillUnmount(){this.setState({mounted:!1})}render(){const{src:t}=this.state,{src:e,fallbackSrc:r,...i}=this.props;return n.createElement("img",o({},i,{src:t,onError:this.onError}))}}e.default=s}}]);