"use strict";(self.webpackChunkwmi_page_monorepo=self.webpackChunkwmi_page_monorepo||[]).push([[873],{56716:function(e,t,a){var l=a(65040),n=a(67294);a(27358);class o extends n.Component{constructor(e){super(e),this.state=Object.assign({slot:"",client:"",format:"auto",style:{},currentSlot:{}},e)}componentDidMount(){window.adsbygoogle||(window.adsbygoogle=[])}render(){const e={"data-ad-slot":this.state.slot,"data-ad-client":"ca-pub-"+this.state.client.replace("ca-pub-",""),"data-ad-format":this.state.format,style:{display:"block",...this.state.style},className:l.arrayDedupe(["adsbygoogle"].concat((this.state.className||"").split(" "))).filter((e=>e.length>0)).join(" ")};return this.state.widthResponsive&&(e["data-full-width-responsive"]=this.state.widthResponsive),/dev/i.test("production")&&(e["data-adtest"]="on"),n.createElement("ins",e)}}t.Z=o},98873:function(e,t,a){a.d(t,{default:function(){return w}});var l=a(67294),n=a(5806),o=a(43577),s=a(70929),r=a(92918),c=a(71770),i=a(56716),d=a(49185);const{Column:m,HeaderCell:p,Cell:u}=n.default,h=(3,Array.from({length:3}).map(((e,t)=>(e=>{const t=d.W.person.firstName(),a=d.W.person.lastName(),l=d.W.person.sex(),n=d.W.person.fullName({firstName:t,lastName:a,sex:l}),o=d.W.image.avatar(),s=d.W.location.city(),r=d.W.location.street(),c=d.W.internet.email(),i=d.W.location.zipCode(),m=d.W.phone.number(),p=d.W.finance.amount({min:1e3,max:9e4}),u=d.W.company.name();return{id:e+1,name:n,firstName:t,lastName:a,avatar:o,city:s,street:r,postcode:i,email:c,phone:m,gender:l,age:Math.floor(30*Math.random())+18,stars:Math.floor(1e4*Math.random()),followers:Math.floor(1e4*Math.random()),rating:2+Math.floor(3*Math.random()),progress:Math.floor(100*Math.random()),amount:p,company:u}})(t))));class f extends l.Component{componentDidMount(){document.title="Adsense Test - WMI",a(37778),window.adsense_option||(window.adsense_option={places:[]}),window.adsense_option.places=["article",".rs-table","h1"],window.adsense_option.root="#adsense-root",window.adsense_option.localhost=["adsense.webmanajemen.com","agc.io","dev.webmanajemen.com"],setTimeout((()=>{window.scrollTo(0,0),setTimeout((()=>{window.scrollTo(0,document.body.scrollHeight/2),setTimeout((()=>{window.scrollTo(0,0)}),800)}),800)}),800)}render(){return l.createElement("div",{id:"adsense-root"},l.createElement("h1",{className:"text-center"},"H1"),l.createElement("b",{className:"text-center"},"<article/>"),new Array(5).fill(0).map(((e,t)=>l.createElement("article",{key:t},"article ",t))),l.createElement("b",{className:"text-center"},"table"),l.createElement(g,null),l.createElement("div",{className:"mt-2 mb-2"},l.createElement(i.Z,{style:{display:"block"},format:"autorelaxed",client:"ca-pub-2188063137129806",slot:"5041245242"})),l.createElement(o.Z,{fluid:!0,className:"mb-2"},l.createElement(s.Z,{className:"show-grid"},l.createElement(r.default,{xsHidden:!0,xs:12},l.createElement(i.Z,{style:{display:"block"},format:"fluid","layout-key":"-gw-3+1f-3d+2z",client:"ca-pub-2188063137129806",slot:"6979059162"})),l.createElement(r.default,{xs:12},l.createElement(i.Z,{style:{display:"block"},format:"fluid","layout-key":"-fb+5w+4e-db+86",client:"ca-pub-2188063137129806",slot:"6133452172"})))),l.createElement("div",{className:"empty"},l.createElement(i.Z,{client:"ca-pub-2188063137129806",slot:"2667720583",format:"auto",widthResponsive:"true"})))}}const g=()=>l.createElement(n.default,{height:400,data:h,onRowClick:e=>{console.log(e)}},l.createElement(m,{width:60,align:"center",fixed:!0},l.createElement(p,null,"Id"),l.createElement(u,{dataKey:"id"})),l.createElement(m,{width:150},l.createElement(p,null,"First Name"),l.createElement(u,{dataKey:"firstName"})),l.createElement(m,{width:150},l.createElement(p,null,"Last Name"),l.createElement(u,{dataKey:"lastName"})),l.createElement(m,{width:100},l.createElement(p,null,"Gender"),l.createElement(u,{dataKey:"gender"})),l.createElement(m,{width:100},l.createElement(p,null,"Age"),l.createElement(u,{dataKey:"age"})),l.createElement(m,{width:150},l.createElement(p,null,"Postcode"),l.createElement(u,{dataKey:"postcode"})),l.createElement(m,{width:300},l.createElement(p,null,"Email"),l.createElement(u,{dataKey:"email"})),l.createElement(m,{width:80,fixed:"right"},l.createElement(p,null,"..."),l.createElement(u,{style:{padding:"6px"}},(e=>l.createElement(c.default,{appearance:"link",onClick:()=>alert("id:".concat(e.id))},"Edit")))));var w=f},43508:function(e,t,a){var l=a(8081),n=a.n(l),o=a(23645),s=a.n(o)()(n());s.push([e.id,".empty{height:300px;background-image:url(\"//www.airhart-therapy.com/wp-content/uploads/2012/05/emptyjpg1.jpg\");background-repeat:no-repeat;background-size:cover}.show-col{background:#3498ff;color:#fff;padding:10px}.show-grid [class*='rs-col-']{padding:10px 5px;color:#fff;background-color:#3498ff;text-align:center;margin-top:6px;margin-bottom:6px}.show-grid [class*='rs-col-'] [class*='rs-col-']{background-color:#1675e0}.show-grid [class*='rs-col-'] [class*='rs-col-'] [class*='rs-col-']{background-color:#004299}.show-grid [class*='rs-col-'] [class*='rs-col-'] [class*='rs-col-']:nth-child(even){opacity:0.9}.show-grid [class*='rs-col-'] [class*='rs-col-']:nth-child(2n){opacity:0.9}.show-grid [class*='rs-col-']:nth-child(2n){opacity:0.8}.show-grid .rs-flex-box-grid-item{margin-top:6px;margin-bottom:6px;padding:10px 5px;color:#fff;text-align:center;background-color:#3498ff}.show-grid .rs-flex-box-grid-item:nth-child(2n){opacity:0.8}\n",""]),t.Z=s},37778:function(e,t,a){a.r(t);var l=a(93379),n=a.n(l),o=a(7795),s=a.n(o),r=a(90569),c=a.n(r),i=a(3565),d=a.n(i),m=a(19216),p=a.n(m),u=a(44589),h=a.n(u),f=a(43508),g={};g.styleTagTransform=h(),g.setAttributes=d(),g.insert=c().bind(null,"head"),g.domAPI=s(),g.insertStyleElement=p(),n()(f.Z,g),t.default=f.Z&&f.Z.locals?f.Z.locals:void 0}}]);