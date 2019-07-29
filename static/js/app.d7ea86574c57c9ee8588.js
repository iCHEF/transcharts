!function(e){function t(t){for(var r,a,o=t[0],s=t[1],i=t[2],d=t[3]||[],c=0,l=[];c<o.length;c++)a=o[c],j[a]&&l.push(j[a][0]),j[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);for(R&&R(t),d.forEach(function(e){if(void 0===j[e]){j[e]=null;var t=document.createElement("link");t.crossOrigin="anonymous",L.nc&&t.setAttribute("nonce",L.nc),t.rel="prefetch",t.as="script",t.href=T(e),document.head.appendChild(t)}});l.length;)l.shift()();return H.push.apply(H,i||[]),n()}function n(){for(var e,t=0;t<H.length;t++){for(var n=H[t],r=!0,a=1;a<n.length;a++){var o=n[a];0!==j[o]&&(r=!1)}r&&(H.splice(t--,1),e=L(L.s=n[0]))}return e}var r=window.webpackHotUpdate;window.webpackHotUpdate=function(e,t){!function(e,t){if(!k[e]||!w[e])return;for(var n in w[e]=!1,t)Object.prototype.hasOwnProperty.call(t,n)&&(m[n]=t[n]);0===--b&&0===y&&E()}(e,t),r&&r(e,t)};var a,o=!0,s="d7ea86574c57c9ee8588",i=1e4,d={},c=[],l=[];function u(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:a!==e,active:!0,accept:function(e,n){if(void 0===e)t._selfAccepted=!0;else if("function"===typeof e)t._selfAccepted=e;else if("object"===typeof e)for(var r=0;r<e.length;r++)t._acceptedDependencies[e[r]]=n||function(){};else t._acceptedDependencies[e]=n||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"===typeof e)for(var n=0;n<e.length;n++)t._declinedDependencies[e[n]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var n=t._disposeHandlers.indexOf(e);n>=0&&t._disposeHandlers.splice(n,1)},check:O,apply:P,status:function(e){if(!e)return h;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var t=p.indexOf(e);t>=0&&p.splice(t,1)},data:d[e]};return a=void 0,t}var p=[],h="idle";function f(e){h=e;for(var t=0;t<p.length;t++)p[t].call(null,e)}var g,m,v,b=0,y=0,x={},w={},k={};function C(e){return+e+""===e?+e:e}function O(e){if("idle"!==h)throw new Error("check() is only allowed in idle status");return o=e,f("check"),(t=i,t=t||1e4,new Promise(function(e,n){if("undefined"===typeof XMLHttpRequest)return n(new Error("No browser support"));try{var r=new XMLHttpRequest,a=L.p+""+s+".hot-update.json";r.open("GET",a,!0),r.timeout=t,r.send(null)}catch(o){return n(o)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)n(new Error("Manifest request to "+a+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)n(new Error("Manifest request to "+a+" failed."));else{try{var t=JSON.parse(r.responseText)}catch(o){return void n(o)}e(t)}}})).then(function(e){if(!e)return f("idle"),null;w={},x={},k=e.c,v=e.h,f("prepare");var t=new Promise(function(e,t){g={resolve:e,reject:t}});for(var n in m={},j)_(n);return"prepare"===h&&0===y&&0===b&&E(),t});var t}function _(e){k[e]?(w[e]=!0,b++,function(e){var t=document.createElement("script");t.charset="utf-8",t.src=L.p+""+e+"."+s+".hot-update.js",t.crossOrigin="anonymous",document.head.appendChild(t)}(e)):x[e]=!0}function E(){f("ready");var e=g;if(g=null,e)if(o)Promise.resolve().then(function(){return P(o)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var n in m)Object.prototype.hasOwnProperty.call(m,n)&&t.push(C(n));e.resolve(t)}}function P(t){if("ready"!==h)throw new Error("apply() is only allowed in ready status");var n,r,a,o,i;function l(e){for(var t=[e],n={},r=t.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var a=r.pop(),s=a.id,i=a.chain;if((o=D[s])&&!o.hot._selfAccepted){if(o.hot._selfDeclined)return{type:"self-declined",chain:i,moduleId:s};if(o.hot._main)return{type:"unaccepted",chain:i,moduleId:s};for(var d=0;d<o.parents.length;d++){var c=o.parents[d],l=D[c];if(l){if(l.hot._declinedDependencies[s])return{type:"declined",chain:i.concat([c]),moduleId:s,parentId:c};-1===t.indexOf(c)&&(l.hot._acceptedDependencies[s]?(n[c]||(n[c]=[]),u(n[c],[s])):(delete n[c],t.push(c),r.push({chain:i.concat([c]),id:c})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:n}}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];-1===e.indexOf(r)&&e.push(r)}}t=t||{};var p={},g=[],b={},y=function(){console.warn("[HMR] unexpected require("+w.moduleId+") to disposed module")};for(var x in m)if(Object.prototype.hasOwnProperty.call(m,x)){var w;i=C(x);var O=!1,_=!1,E=!1,P="";switch((w=m[x]?l(i):{type:"disposed",moduleId:x}).chain&&(P="\nUpdate propagation: "+w.chain.join(" -> ")),w.type){case"self-declined":t.onDeclined&&t.onDeclined(w),t.ignoreDeclined||(O=new Error("Aborted because of self decline: "+w.moduleId+P));break;case"declined":t.onDeclined&&t.onDeclined(w),t.ignoreDeclined||(O=new Error("Aborted because of declined dependency: "+w.moduleId+" in "+w.parentId+P));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(w),t.ignoreUnaccepted||(O=new Error("Aborted because "+i+" is not accepted"+P));break;case"accepted":t.onAccepted&&t.onAccepted(w),_=!0;break;case"disposed":t.onDisposed&&t.onDisposed(w),E=!0;break;default:throw new Error("Unexception type "+w.type)}if(O)return f("abort"),Promise.reject(O);if(_)for(i in b[i]=m[i],u(g,w.outdatedModules),w.outdatedDependencies)Object.prototype.hasOwnProperty.call(w.outdatedDependencies,i)&&(p[i]||(p[i]=[]),u(p[i],w.outdatedDependencies[i]));E&&(u(g,[w.moduleId]),b[i]=y)}var H,T=[];for(r=0;r<g.length;r++)i=g[r],D[i]&&D[i].hot._selfAccepted&&T.push({module:i,errorHandler:D[i].hot._selfAccepted});f("dispose"),Object.keys(k).forEach(function(e){!1===k[e]&&function(e){delete j[e]}(e)});for(var A,I,S=g.slice();S.length>0;)if(i=S.pop(),o=D[i]){var R={},M=o.hot._disposeHandlers;for(a=0;a<M.length;a++)(n=M[a])(R);for(d[i]=R,o.hot.active=!1,delete D[i],delete p[i],a=0;a<o.children.length;a++){var z=D[o.children[a]];z&&((H=z.parents.indexOf(i))>=0&&z.parents.splice(H,1))}}for(i in p)if(Object.prototype.hasOwnProperty.call(p,i)&&(o=D[i]))for(I=p[i],a=0;a<I.length;a++)A=I[a],(H=o.children.indexOf(A))>=0&&o.children.splice(H,1);for(i in f("apply"),s=v,b)Object.prototype.hasOwnProperty.call(b,i)&&(e[i]=b[i]);var B=null;for(i in p)if(Object.prototype.hasOwnProperty.call(p,i)&&(o=D[i])){I=p[i];var q=[];for(r=0;r<I.length;r++)if(A=I[r],n=o.hot._acceptedDependencies[A]){if(-1!==q.indexOf(n))continue;q.push(n)}for(r=0;r<q.length;r++){n=q[r];try{n(I)}catch(G){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:i,dependencyId:I[r],error:G}),t.ignoreErrored||B||(B=G)}}}for(r=0;r<T.length;r++){var U=T[r];i=U.module,c=[i];try{L(i)}catch(G){if("function"===typeof U.errorHandler)try{U.errorHandler(G)}catch(N){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:i,error:N,originalError:G}),t.ignoreErrored||B||(B=N),B||(B=G)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:i,error:G}),t.ignoreErrored||B||(B=G)}}return B?(f("fail"),Promise.reject(B)):(f("idle"),new Promise(function(e){e(g)}))}var D={},j={3:0},H=[];function T(e){return L.p+"static/js/"+({1:"docs-chart-settings-data-encodings~docs-chart-settings-legend~docs-chart-settings-title~docs-charts-~265f51bf",2:"docs-chart-settings-data-encodings~docs-chart-settings-legend~docs-chart-settings-title~docs-charts-~20bd6ab0",4:"docs-animations-animated-clip-rect",5:"docs-api-reference-overview",6:"docs-chart-settings-data-encodings",7:"docs-chart-settings-legend",8:"docs-chart-settings-title",9:"docs-charts-bar-chart",10:"docs-charts-line-chart",11:"docs-graph-components-header-box",12:"docs-graph-components-responsive-layer",13:"docs-graph-hooks-use-container-dimension",14:"docs-index",15:"docs-themes-theme"}[e]||e)+"."+{1:"f61948f8",2:"c88a5ebb",4:"38a72aeb",5:"dbe1c646",6:"23ad5303",7:"e4d68d11",8:"0f7277b0",9:"94da1a64",10:"18d49756",11:"09cc6c97",12:"4670d2e8",13:"812f7cc1",14:"29424b8d",15:"1890e21c"}[e]+".js"}function L(t){if(D[t])return D[t].exports;var n=D[t]={i:t,l:!1,exports:{},hot:u(t),parents:(l=c,c=[],l),children:[]};return e[t].call(n.exports,n,n.exports,function(e){var t=D[e];if(!t)return L;var n=function(n){return t.hot.active?(D[n]?-1===D[n].parents.indexOf(e)&&D[n].parents.push(e):(c=[e],a=n),-1===t.children.indexOf(n)&&t.children.push(n)):(console.warn("[HMR] unexpected require("+n+") from disposed module "+e),c=[]),L(n)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return L[e]},set:function(t){L[e]=t}}};for(var o in L)Object.prototype.hasOwnProperty.call(L,o)&&"e"!==o&&"t"!==o&&Object.defineProperty(n,o,r(o));return n.e=function(e){return"ready"===h&&f("prepare"),y++,L.e(e).then(t,function(e){throw t(),e});function t(){y--,"prepare"===h&&(x[e]||_(e),0===y&&0===b&&E())}},n.t=function(e,t){return 1&t&&(e=n(e)),L.t(e,-2&t)},n}(t)),n.l=!0,n.exports}L.e=function(e){var t=[],n=j[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=j[e]=[t,r]});t.push(n[2]=r);var a,o=document.createElement("script");o.charset="utf-8",o.timeout=120,L.nc&&o.setAttribute("nonce",L.nc),o.src=T(e),0!==o.src.indexOf(window.location.origin+"/")&&(o.crossOrigin="anonymous"),a=function(t){o.onerror=o.onload=null,clearTimeout(s);var n=j[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+a+")");i.type=r,i.request=a,n[1](i)}j[e]=void 0}};var s=setTimeout(function(){a({type:"timeout",target:o})},12e4);o.onerror=o.onload=a,document.head.appendChild(o)}return Promise.all(t)},L.m=e,L.c=D,L.d=function(e,t,n){L.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},L.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},L.t=function(e,t){if(1&t&&(e=L(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(L.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)L.d(n,r,function(t){return e[t]}.bind(null,r));return n},L.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return L.d(t,"a",t),t},L.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},L.p="/transcharts/",L.oe=function(e){throw console.error(e),e},L.h=function(){return s};var A=window.webpackJsonp=window.webpackJsonp||[],I=A.push.bind(A);A.push=t,A=A.slice();for(var S=0;S<A.length;S++)t(A[S]);var R=I;t([[],{},0,[0,1,2,6,7,8,9,10,14,15,11,12,13,4,5]]),H.push([0,0]),n()}({"./.docz/app/db.json":function(e){e.exports={config:{title:"Transchart",description:"My awesome app using docz",menu:["Introduction","Charts","Chart Settings","Graph Components","Graph Hooks","Animations","Themes","API Reference"],version:"0.0.2",repository:"https://github.com/iCHEF/transcharts",native:!1,codeSandbox:!0,themeConfig:{mode:"light",codemirrorTheme:"oceanic-next",showPlaygroundEditor:!0,colors:{primary:"#ff7049",background:"#e3e5e5",blue:"#2f98f7",sidebarBg:"#e3e5e5",codeBg:"#ffffff",codeColor:"#ff7049",theadColor:"#555e6d"},styles:{body:["\n        font-family: 'Source Sans Pro',helvetica,'PingFang TC','Noto Sans TC','Microsoft JhengHei',sans-serif;\n        line-height: 1.6;\n        img {\n          max-width: 100%;\n        }\n      "],playground:["\n        background: #ffffff;\n        padding: 1rem;\n      "]}},separator:"-",typescript:!0,hashRouter:!0,htmlContext:{head:{links:[{rel:"stylesheet",href:"https://codemirror.net/theme/oceanic-next.css"}]}}},entries:[{key:"docs/index.mdx",value:{name:"Introduction",route:"/transcharts/",id:"73498ad0e1e62a714b08085d318f9de1",filepath:"docs/index.mdx",link:"",slug:"docs-index",menu:"",headings:[{slug:"introduction",depth:1,value:"Introduction"},{slug:"the-chart-package",depth:2,value:"The  chart  package"},{slug:"the-graph-and-animation-package",depth:2,value:"The  graph  and  animation  package"},{slug:"development",depth:2,value:"Development"}]}},{key:"docs/animations/AnimatedClipRect.mdx",value:{name:"Clipping Rectangle",route:"/transcharts/animations/clip_rect",menu:"Animations",id:"44341736687f67db8590756c69f46d5a",filepath:"docs/animations/AnimatedClipRect.mdx",link:"",slug:"docs-animations-animated-clip-rect",headings:[{slug:"clipping-rectangle",depth:1,value:"Clipping Rectangle"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/api-reference/Overview.mdx",value:{name:"Making Your Own Charts",route:"/transcharts/api_reference/overview",menu:"API Reference",id:"2920160af5d297436465b337c4961163",filepath:"docs/api-reference/Overview.mdx",link:"",slug:"docs-api-reference-overview",headings:[{slug:"making-your-own-charts",depth:1,value:"Making Your Own Charts"},{slug:"calculate-chart-dimensions",depth:2,value:"Calculate Chart Dimensions"},{slug:"svgwithaxisframe",depth:2,value:"SvgWithAxisFrame"},{slug:"add-tooltipshovering-effects",depth:2,value:"Add Tooltips/Hovering Effects"},{slug:"usecartesianencodings",depth:3,value:"useCartesianEncodings"},{slug:"input-of-usecartesianencodings",depth:4,value:"Input of useCartesianEncodings"},{slug:"output-of-usecartesianencodings",depth:4,value:"Output of useCartesianEncodings"}]}},{key:"docs/chart-settings/DataEncodings.mdx",value:{name:"Data Encodings",route:"/transcharts/chart_settings/data_encodings",menu:"Chart Settings",id:"dec0e67ac8734f48135cff25a349d774",filepath:"docs/chart-settings/DataEncodings.mdx",link:"",slug:"docs-chart-settings-data-encodings",headings:[{slug:"data-encodings",depth:1,value:"Data Encodings"},{slug:"data-types",depth:3,value:"Data Types"},{slug:"how-different-charts-deal-with-data-encodings",depth:2,value:"How different charts deal with data encodings?"},{slug:"bar-chart",depth:3,value:"Bar Chart"},{slug:"vertical-chart",depth:4,value:"Vertical Chart"},{slug:"horizontal-chart",depth:4,value:"Horizontal Chart"}]}},{key:"docs/chart-settings/Legend.mdx",value:{name:"Legend",route:"/transcharts/chart_settings/legend",menu:"Chart Settings",id:"07305c374c4e32d2305959f99f68a3aa",filepath:"docs/chart-settings/Legend.mdx",link:"",slug:"docs-chart-settings-legend",headings:[{slug:"legend",depth:1,value:"Legend"},{slug:"default-legend",depth:2,value:"Default legend"},{slug:"hide-legend",depth:2,value:"Hide legend"},{slug:"custom-legend",depth:2,value:"Custom legend"},{slug:"direction",depth:2,value:"direction"},{slug:"horizontal",depth:3,value:"horizontal"},{slug:"vertical",depth:3,value:"vertical"},{slug:"orient",depth:2,value:"orient"},{slug:"left",depth:3,value:"left"},{slug:"top",depth:3,value:"top"},{slug:"bottom",depth:3,value:"bottom"},{slug:"legend-config-properties-table",depth:2,value:"Legend config properties table"}]}},{key:"docs/chart-settings/Title.mdx",value:{name:"Title",route:"/transcharts/chart_settings/title",menu:"Chart Settings",id:"4c8c60b6bb22bc0e81ce8429eaa126c4",filepath:"docs/chart-settings/Title.mdx",link:"",slug:"docs-chart-settings-title",headings:[{slug:"title",depth:1,value:"Title"},{slug:"example",depth:2,value:"Example"}]}},{key:"docs/charts/BarChart.mdx",value:{name:"2. Bar Chart",route:"/transcharts/charts/bar_chart",menu:"Charts",id:"250b2db00522f2b42d898e9de4f464fe",filepath:"docs/charts/BarChart.mdx",link:"",slug:"docs-charts-bar-chart",headings:[{slug:"bar-chart",depth:1,value:"Bar Chart"},{slug:"using-different-scales-on-the-x-axis",depth:2,value:"Using different scales on the X-axis"},{slug:"linear--linear",depth:3,value:"Linear + Linear"},{slug:"linear--linear-transposed",depth:3,value:"Linear + Linear (transposed)"},{slug:"time--linear",depth:3,value:"Time + Linear"},{slug:"point--linear",depth:3,value:"Point + Linear"},{slug:"stacked-bar-chart",depth:2,value:"Stacked bar chart"},{slug:"nominal-color-field",depth:3,value:"Nominal color field"},{slug:"quantitative-color-field",depth:3,value:"Quantitative color field"},{slug:"quantitative-color-field-transposed",depth:3,value:"Quantitative color field (transposed)"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/charts/LineChart.mdx",value:{name:"1. Line Chart",route:"/transcharts/charts/line_chart",menu:"Charts",id:"c90d2a57da37fe6f55d4cb610b161b30",filepath:"docs/charts/LineChart.mdx",link:"",slug:"docs-charts-line-chart",headings:[{slug:"line-chart",depth:1,value:"Line Chart"},{slug:"using-different-scales-on-the-x-axis",depth:2,value:"Using different scales on the X-axis"},{slug:"ordinal--quantitative",depth:3,value:"Ordinal + Quantitative"},{slug:"time--linear",depth:3,value:"Time + Linear"},{slug:"point--linear",depth:3,value:"Point + Linear"},{slug:"multiple-lines",depth:2,value:"Multiple lines"},{slug:"nominal-color-field",depth:3,value:"Nominal color field"},{slug:"ordinal-color-field",depth:3,value:"Ordinal color field"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/graph-components/HeaderBox.mdx",value:{name:"HeaderBox",route:"/transcharts/graph_components/header_box",menu:"Graph Components",id:"cd9ab9f72ac44349456409bbdc35c3c9",filepath:"docs/graph-components/HeaderBox.mdx",link:"",slug:"docs-graph-components-header-box",headings:[{slug:"headerbox",depth:1,value:"HeaderBox"},{slug:"example",depth:2,value:"Example"},{slug:"title-only",depth:2,value:"Title Only"},{slug:"align",depth:2,value:"Align"},{slug:"example-1",depth:3,value:"Example"},{slug:"customizing-the-styles",depth:2,value:"Customizing the styles"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/graph-components/ResponsiveLayer.mdx",value:{name:"ResponsiveLayers",route:"/transcharts/graph_components/responsive_layer",menu:"Graph Components",id:"57e070f0e93768b58bb532ad753a0b43",filepath:"docs/graph-components/ResponsiveLayer.mdx",link:"",slug:"docs-graph-components-responsive-layer",headings:[{slug:"responsive-layer",depth:1,value:"Responsive Layer"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/graph-hooks/useContainerDimension.mdx",value:{name:"useContainerDimension",route:"/transcharts/graph_hooks/use_container_dimension",menu:"Graph Hooks",id:"61c6990f86023ab627e0136509c21130",filepath:"docs/graph-hooks/useContainerDimension.mdx",link:"",slug:"docs-graph-hooks-use-container-dimension",headings:[{slug:"usecontainerdimension",depth:1,value:"useContainerDimension"},{slug:"advanced-usage",depth:2,value:"Advanced Usage"},{slug:"customizing-the-debouncetime",depth:3,value:"Customizing the  debounceTime"}]}},{key:"docs/themes/Theme.mdx",value:{name:"Themes",route:"/transcharts/themes",menu:"Themes",id:"5749d889beacd79e13c01873291e563d",filepath:"docs/themes/Theme.mdx",link:"",slug:"docs-themes-theme",headings:[{slug:"theme",depth:1,value:"Theme"},{slug:"example-line-chart",depth:2,value:"Example: Line Chart"},{slug:"proptypes",depth:2,value:"propTypes"},{slug:"theme-attributes",depth:2,value:"theme  attributes:"},{slug:"current-default-theme",depth:3,value:"Current default theme"}]}}],props:null}},"./.docz/app/index.jsx":function(e,t,n){"use strict";n.r(t);var r=n("./node_modules/react/index.js"),a=n.n(r),o=n("./node_modules/react-dom/index.js"),s=n.n(o),i=n("./node_modules/docz/dist/index.esm.js"),d=n("./node_modules/docz-theme-default/dist/index.esm.js"),c={"docs/index.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(14)]).then(n.bind(null,"./docs/index.mdx"))},"docs/animations/AnimatedClipRect.mdx":function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"./docs/animations/AnimatedClipRect.mdx"))},"docs/api-reference/Overview.mdx":function(){return Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"./docs/api-reference/Overview.mdx"))},"docs/chart-settings/DataEncodings.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(6)]).then(n.bind(null,"./docs/chart-settings/DataEncodings.mdx"))},"docs/chart-settings/Legend.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(7)]).then(n.bind(null,"./docs/chart-settings/Legend.mdx"))},"docs/chart-settings/Title.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(8)]).then(n.bind(null,"./docs/chart-settings/Title.mdx"))},"docs/charts/BarChart.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(9)]).then(n.bind(null,"./docs/charts/BarChart.mdx"))},"docs/charts/LineChart.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(10)]).then(n.bind(null,"./docs/charts/LineChart.mdx"))},"docs/graph-components/HeaderBox.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(11)]).then(n.bind(null,"./docs/graph-components/HeaderBox.mdx"))},"docs/graph-components/ResponsiveLayer.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(12)]).then(n.bind(null,"./docs/graph-components/ResponsiveLayer.mdx"))},"docs/graph-hooks/useContainerDimension.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(13)]).then(n.bind(null,"./docs/graph-hooks/useContainerDimension.mdx"))},"docs/themes/Theme.mdx":function(){return Promise.all([n.e(0),n.e(1),n.e(2),n.e(15)]).then(n.bind(null,"./docs/themes/Theme.mdx"))}},l=n("./.docz/app/db.json"),u=function(){return a.a.createElement(d.a,{linkComponent:i.b,db:l},a.a.createElement(i.e,{imports:c}))},p=[],h=[],f=function(){return h.forEach(function(e){return e&&e()})},g=document.querySelector("#root");!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;p.forEach(function(e){return e&&e()}),s.a.render(a.a.createElement(e,null),g,f)}(u)},0:function(e,t,n){e.exports=n("./.docz/app/index.jsx")}});
//# sourceMappingURL=app.d7ea86574c57c9ee8588.js.map