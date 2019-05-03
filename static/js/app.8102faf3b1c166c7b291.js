!function(e){function n(n){for(var r,o,a=n[0],i=n[1],d=n[2],s=n[3]||[],l=0,c=[];l<a.length;l++)o=a[l],E[o]&&c.push(E[o][0]),E[o]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);for(M&&M(n),s.forEach(function(e){if(void 0===E[e]){E[e]=null;var n=document.createElement("link");n.crossOrigin="anonymous",A.nc&&n.setAttribute("nonce",A.nc),n.rel="prefetch",n.as="script",n.href=H(e),document.head.appendChild(n)}});c.length;)c.shift()();return L.push.apply(L,d||[]),t()}function t(){for(var e,n=0;n<L.length;n++){for(var t=L[n],r=!0,o=1;o<t.length;o++){var a=t[o];0!==E[a]&&(r=!1)}r&&(L.splice(n--,1),e=A(A.s=t[0]))}return e}var r=window.webpackHotUpdate;window.webpackHotUpdate=function(e,n){!function(e,n){if(!k[e]||!w[e])return;for(var t in w[e]=!1,n)Object.prototype.hasOwnProperty.call(n,t)&&(g[t]=n[t]);0===--y&&0===b&&P()}(e,n),r&&r(e,n)};var o,a=!0,i="8102faf3b1c166c7b291",d=1e4,s={},l=[],c=[];function u(e){var n={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:o!==e,active:!0,accept:function(e,t){if(void 0===e)n._selfAccepted=!0;else if("function"===typeof e)n._selfAccepted=e;else if("object"===typeof e)for(var r=0;r<e.length;r++)n._acceptedDependencies[e[r]]=t||function(){};else n._acceptedDependencies[e]=t||function(){}},decline:function(e){if(void 0===e)n._selfDeclined=!0;else if("object"===typeof e)for(var t=0;t<e.length;t++)n._declinedDependencies[e[t]]=!0;else n._declinedDependencies[e]=!0},dispose:function(e){n._disposeHandlers.push(e)},addDisposeHandler:function(e){n._disposeHandlers.push(e)},removeDisposeHandler:function(e){var t=n._disposeHandlers.indexOf(e);t>=0&&n._disposeHandlers.splice(t,1)},check:_,apply:j,status:function(e){if(!e)return h;p.push(e)},addStatusHandler:function(e){p.push(e)},removeStatusHandler:function(e){var n=p.indexOf(e);n>=0&&p.splice(n,1)},data:s[e]};return o=void 0,n}var p=[],h="idle";function f(e){h=e;for(var n=0;n<p.length;n++)p[n].call(null,e)}var m,g,v,y=0,b=0,x={},w={},k={};function O(e){return+e+""===e?+e:e}function _(e){if("idle"!==h)throw new Error("check() is only allowed in idle status");return a=e,f("check"),(n=d,n=n||1e4,new Promise(function(e,t){if("undefined"===typeof XMLHttpRequest)return t(new Error("No browser support"));try{var r=new XMLHttpRequest,o=A.p+""+i+".hot-update.json";r.open("GET",o,!0),r.timeout=n,r.send(null)}catch(a){return t(a)}r.onreadystatechange=function(){if(4===r.readyState)if(0===r.status)t(new Error("Manifest request to "+o+" timed out."));else if(404===r.status)e();else if(200!==r.status&&304!==r.status)t(new Error("Manifest request to "+o+" failed."));else{try{var n=JSON.parse(r.responseText)}catch(a){return void t(a)}e(n)}}})).then(function(e){if(!e)return f("idle"),null;w={},x={},k=e.c,v=e.h,f("prepare");var n=new Promise(function(e,n){m={resolve:e,reject:n}});for(var t in g={},E)C(t);return"prepare"===h&&0===b&&0===y&&P(),n});var n}function C(e){k[e]?(w[e]=!0,y++,function(e){var n=document.createElement("script");n.charset="utf-8",n.src=A.p+""+e+"."+i+".hot-update.js",n.crossOrigin="anonymous",document.head.appendChild(n)}(e)):x[e]=!0}function P(){f("ready");var e=m;if(m=null,e)if(a)Promise.resolve().then(function(){return j(a)}).then(function(n){e.resolve(n)},function(n){e.reject(n)});else{var n=[];for(var t in g)Object.prototype.hasOwnProperty.call(g,t)&&n.push(O(t));e.resolve(n)}}function j(n){if("ready"!==h)throw new Error("apply() is only allowed in ready status");var t,r,o,a,d;function c(e){for(var n=[e],t={},r=n.slice().map(function(e){return{chain:[e],id:e}});r.length>0;){var o=r.pop(),i=o.id,d=o.chain;if((a=D[i])&&!a.hot._selfAccepted){if(a.hot._selfDeclined)return{type:"self-declined",chain:d,moduleId:i};if(a.hot._main)return{type:"unaccepted",chain:d,moduleId:i};for(var s=0;s<a.parents.length;s++){var l=a.parents[s],c=D[l];if(c){if(c.hot._declinedDependencies[i])return{type:"declined",chain:d.concat([l]),moduleId:i,parentId:l};-1===n.indexOf(l)&&(c.hot._acceptedDependencies[i]?(t[l]||(t[l]=[]),u(t[l],[i])):(delete t[l],n.push(l),r.push({chain:d.concat([l]),id:l})))}}}}return{type:"accepted",moduleId:e,outdatedModules:n,outdatedDependencies:t}}function u(e,n){for(var t=0;t<n.length;t++){var r=n[t];-1===e.indexOf(r)&&e.push(r)}}n=n||{};var p={},m=[],y={},b=function(){console.warn("[HMR] unexpected require("+w.moduleId+") to disposed module")};for(var x in g)if(Object.prototype.hasOwnProperty.call(g,x)){var w;d=O(x);var _=!1,C=!1,P=!1,j="";switch((w=g[x]?c(d):{type:"disposed",moduleId:x}).chain&&(j="\nUpdate propagation: "+w.chain.join(" -> ")),w.type){case"self-declined":n.onDeclined&&n.onDeclined(w),n.ignoreDeclined||(_=new Error("Aborted because of self decline: "+w.moduleId+j));break;case"declined":n.onDeclined&&n.onDeclined(w),n.ignoreDeclined||(_=new Error("Aborted because of declined dependency: "+w.moduleId+" in "+w.parentId+j));break;case"unaccepted":n.onUnaccepted&&n.onUnaccepted(w),n.ignoreUnaccepted||(_=new Error("Aborted because "+d+" is not accepted"+j));break;case"accepted":n.onAccepted&&n.onAccepted(w),C=!0;break;case"disposed":n.onDisposed&&n.onDisposed(w),P=!0;break;default:throw new Error("Unexception type "+w.type)}if(_)return f("abort"),Promise.reject(_);if(C)for(d in y[d]=g[d],u(m,w.outdatedModules),w.outdatedDependencies)Object.prototype.hasOwnProperty.call(w.outdatedDependencies,d)&&(p[d]||(p[d]=[]),u(p[d],w.outdatedDependencies[d]));P&&(u(m,[w.moduleId]),y[d]=b)}var L,H=[];for(r=0;r<m.length;r++)d=m[r],D[d]&&D[d].hot._selfAccepted&&H.push({module:d,errorHandler:D[d].hot._selfAccepted});f("dispose"),Object.keys(k).forEach(function(e){!1===k[e]&&function(e){delete E[e]}(e)});for(var T,I,R=m.slice();R.length>0;)if(d=R.pop(),a=D[d]){var M={},S=a.hot._disposeHandlers;for(o=0;o<S.length;o++)(t=S[o])(M);for(s[d]=M,a.hot.active=!1,delete D[d],delete p[d],o=0;o<a.children.length;o++){var z=D[a.children[o]];z&&((L=z.parents.indexOf(d))>=0&&z.parents.splice(L,1))}}for(d in p)if(Object.prototype.hasOwnProperty.call(p,d)&&(a=D[d]))for(I=p[d],o=0;o<I.length;o++)T=I[o],(L=a.children.indexOf(T))>=0&&a.children.splice(L,1);for(d in f("apply"),i=v,y)Object.prototype.hasOwnProperty.call(y,d)&&(e[d]=y[d]);var U=null;for(d in p)if(Object.prototype.hasOwnProperty.call(p,d)&&(a=D[d])){I=p[d];var q=[];for(r=0;r<I.length;r++)if(T=I[r],t=a.hot._acceptedDependencies[T]){if(-1!==q.indexOf(t))continue;q.push(t)}for(r=0;r<q.length;r++){t=q[r];try{t(I)}catch(N){n.onErrored&&n.onErrored({type:"accept-errored",moduleId:d,dependencyId:I[r],error:N}),n.ignoreErrored||U||(U=N)}}}for(r=0;r<H.length;r++){var B=H[r];d=B.module,l=[d];try{A(d)}catch(N){if("function"===typeof B.errorHandler)try{B.errorHandler(N)}catch(X){n.onErrored&&n.onErrored({type:"self-accept-error-handler-errored",moduleId:d,error:X,originalError:N}),n.ignoreErrored||U||(U=X),U||(U=N)}else n.onErrored&&n.onErrored({type:"self-accept-errored",moduleId:d,error:N}),n.ignoreErrored||U||(U=N)}}return U?(f("fail"),Promise.reject(U)):(f("idle"),new Promise(function(e){e(m)}))}var D={},E={2:0},L=[];function H(e){return A.p+"static/js/"+({1:"docs-charts-bar-chart~docs-charts-line-chart~docs-hooks-use-container-dimension~docs-index~docs-laye~888e7bf1",3:"docs-animations-animated-clip-rect",4:"docs-charts-bar-chart",5:"docs-charts-line-chart",6:"docs-hooks-use-container-dimension",7:"docs-index",8:"docs-layers-responsive-layer",9:"docs-legend-legend",10:"docs-themes-theme"}[e]||e)+"."+{1:"56ce04dc",3:"011919a7",4:"c9ba3671",5:"72643ca4",6:"a46357c5",7:"7e9914b5",8:"c03a9a72",9:"a728500b",10:"c84e3e50"}[e]+".js"}function A(n){if(D[n])return D[n].exports;var t=D[n]={i:n,l:!1,exports:{},hot:u(n),parents:(c=l,l=[],c),children:[]};return e[n].call(t.exports,t,t.exports,function(e){var n=D[e];if(!n)return A;var t=function(t){return n.hot.active?(D[t]?-1===D[t].parents.indexOf(e)&&D[t].parents.push(e):(l=[e],o=t),-1===n.children.indexOf(t)&&n.children.push(t)):(console.warn("[HMR] unexpected require("+t+") from disposed module "+e),l=[]),A(t)},r=function(e){return{configurable:!0,enumerable:!0,get:function(){return A[e]},set:function(n){A[e]=n}}};for(var a in A)Object.prototype.hasOwnProperty.call(A,a)&&"e"!==a&&"t"!==a&&Object.defineProperty(t,a,r(a));return t.e=function(e){return"ready"===h&&f("prepare"),b++,A.e(e).then(n,function(e){throw n(),e});function n(){b--,"prepare"===h&&(x[e]||C(e),0===b&&0===y&&P())}},t.t=function(e,n){return 1&n&&(e=t(e)),A.t(e,-2&n)},t}(n)),t.l=!0,t.exports}A.e=function(e){var n=[],t=E[e];if(0!==t)if(t)n.push(t[2]);else{var r=new Promise(function(n,r){t=E[e]=[n,r]});n.push(t[2]=r);var o,a=document.createElement("script");a.charset="utf-8",a.timeout=120,A.nc&&a.setAttribute("nonce",A.nc),a.src=H(e),0!==a.src.indexOf(window.location.origin+"/")&&(a.crossOrigin="anonymous"),o=function(n){a.onerror=a.onload=null,clearTimeout(i);var t=E[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,d=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");d.type=r,d.request=o,t[1](d)}E[e]=void 0}};var i=setTimeout(function(){o({type:"timeout",target:a})},12e4);a.onerror=a.onload=o,document.head.appendChild(a)}return Promise.all(n)},A.m=e,A.c=D,A.d=function(e,n,t){A.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},A.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},A.t=function(e,n){if(1&n&&(e=A(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(A.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)A.d(t,r,function(n){return e[n]}.bind(null,r));return t},A.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return A.d(n,"a",n),n},A.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},A.p="/transcharts/",A.oe=function(e){throw console.error(e),e},A.h=function(){return i};var T=window.webpackJsonp=window.webpackJsonp||[],I=T.push.bind(T);T.push=n,T=T.slice();for(var R=0;R<T.length;R++)n(T[R]);var M=I;n([[],{},0,[0,1,4,5,6,7,8,9,10,3]]),L.push([0,0]),t()}({"./.docz/app/db.json":function(e){e.exports={config:{title:"Transchart",description:"My awesome app using docz",menu:[],version:"0.0.2",repository:"https://github.com/iCHEF/transcharts",native:!1,codeSandbox:!0,themeConfig:{mode:"light",codemirrorTheme:"oceanic-next",showPlaygroundEditor:!0,colors:{primary:"#ff7049",background:"#e3e5e5",blue:"#2f98f7",sidebarBg:"#e3e5e5",codeBg:"#ffffff",codeColor:"#ff7049",theadColor:"#555e6d"},styles:{playground:["\n        background: #ffffff;\n        padding: 1rem;\n      "]}},separator:"-",typescript:!0,hashRouter:!0,htmlContext:{head:{links:[{rel:"stylesheet",href:"https://codemirror.net/theme/oceanic-next.css"}]}}},entries:[{key:"docs/index.mdx",value:{name:"Introduction",route:"/transcharts/",id:"73498ad0e1e62a714b08085d318f9de1",filepath:"docs/index.mdx",link:"",slug:"docs-index",menu:"",headings:[{slug:"introduction",depth:1,value:"Introduction"},{slug:"development",depth:2,value:"Development"},{slug:"props",depth:3,value:"Props"}]}},{key:"docs/animations/AnimatedClipRect.mdx",value:{name:"Clipping Rectangle",route:"/transcharts/animations/clip_rect",menu:"Animations",id:"44341736687f67db8590756c69f46d5a",filepath:"docs/animations/AnimatedClipRect.mdx",link:"",slug:"docs-animations-animated-clip-rect",headings:[{slug:"clipping-rectangle",depth:1,value:"Clipping Rectangle"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/charts/BarChart.mdx",value:{name:"Bar Chart",route:"/transcharts/charts/bar_chart",menu:"Charts",id:"250b2db00522f2b42d898e9de4f464fe",filepath:"docs/charts/BarChart.mdx",link:"",slug:"docs-charts-bar-chart",headings:[{slug:"bar-chart",depth:1,value:"Bar Chart"},{slug:"using-different-scales-on-the-x-axis",depth:2,value:"Using different scales on the X-axis"},{slug:"linear--linear",depth:3,value:"Linear + Linear"},{slug:"time--linear",depth:3,value:"Time + Linear"},{slug:"point--linear",depth:3,value:"Point + Linear"},{slug:"stacked-bar-chart",depth:2,value:"Stacked bar chart"},{slug:"nominal-color-field",depth:3,value:"Nominal color field"},{slug:"quantitative-color-field",depth:3,value:"Quantitative color field"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/charts/LineChart.mdx",value:{name:"Line Chart",route:"/transcharts/charts/line_chart",menu:"Charts",id:"c90d2a57da37fe6f55d4cb610b161b30",filepath:"docs/charts/LineChart.mdx",link:"",slug:"docs-charts-line-chart",headings:[{slug:"line-chart",depth:1,value:"Line Chart"},{slug:"using-different-scales-on-the-x-axis",depth:2,value:"Using different scales on the X-axis"},{slug:"linear--linear",depth:3,value:"Linear + Linear"},{slug:"time--linear",depth:3,value:"Time + Linear"},{slug:"point--linear",depth:3,value:"Point + Linear"},{slug:"multiple-lines",depth:2,value:"Multiple lines"},{slug:"nominal-color-field",depth:3,value:"Nominal color field"},{slug:"ordinal-color-field",depth:3,value:"Ordinal color field"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/hooks/useContainerDimension.mdx",value:{name:"useContainerDimension",route:"/transcharts/hooks/use_container_dimension",menu:"Hooks",id:"7777eaf8e6fa5ea95ee082164890e03f",filepath:"docs/hooks/useContainerDimension.mdx",link:"",slug:"docs-hooks-use-container-dimension",headings:[{slug:"usecontainerdimension",depth:1,value:"useContainerDimension"},{slug:"advanced-usage",depth:2,value:"Advanced Usage"},{slug:"customizing-the-debouncetime",depth:3,value:"Customizing the  debounceTime"}]}},{key:"docs/layers/ResponsiveLayer.mdx",value:{name:"ResponsiveLayers",route:"/transcharts/layers/responsive",menu:"Layers",id:"1f09c0b4eecc80650429463461eff10e",filepath:"docs/layers/ResponsiveLayer.mdx",link:"",slug:"docs-layers-responsive-layer",headings:[{slug:"responsive-layer",depth:1,value:"Responsive Layer"},{slug:"props",depth:2,value:"Props"}]}},{key:"docs/legend/legend.mdx",value:{name:"Legend",route:"/transcharts/legend",menu:"Legend",id:"57fdb77c9c13f1e6e376401f20e0a771",filepath:"docs/legend/legend.mdx",link:"",slug:"docs-legend-legend",headings:[{slug:"legend",depth:1,value:"Legend"},{slug:"default-legend",depth:2,value:"Default legend"},{slug:"hide-legend",depth:2,value:"Hide legend"},{slug:"custom-legend",depth:2,value:"Custom legend"},{slug:"direction",depth:2,value:"direction"},{slug:"horizontal",depth:3,value:"horizontal"},{slug:"vertical",depth:3,value:"vertical"},{slug:"orient",depth:2,value:"orient"},{slug:"left",depth:3,value:"left"},{slug:"top",depth:3,value:"top"},{slug:"bottom",depth:3,value:"bottom"},{slug:"legend-config-properties-table",depth:2,value:"Legend config properties table"}]}},{key:"docs/themes/Theme.mdx",value:{name:"Themes",route:"/transcharts/themes",menu:"Themes",id:"5749d889beacd79e13c01873291e563d",filepath:"docs/themes/Theme.mdx",link:"",slug:"docs-themes-theme",headings:[{slug:"theme",depth:1,value:"Theme"},{slug:"line-chart",depth:1,value:"Line Chart"},{slug:"proptypes",depth:2,value:"propTypes"},{slug:"theme-attributes",depth:2,value:"theme  attributes:"},{slug:"currently-default-theme",depth:3,value:"Currently default theme"}]}}],props:null}},"./.docz/app/index.jsx":function(e,n,t){"use strict";t.r(n);var r=t("./node_modules/react/index.js"),o=t.n(r),a=t("./node_modules/react-dom/index.js"),i=t.n(a),d=t("./node_modules/docz/dist/index.esm.js"),s=t("./node_modules/docz-theme-default/dist/index.esm.js"),l={"docs/index.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(7)]).then(t.bind(null,"./docs/index.mdx"))},"docs/animations/AnimatedClipRect.mdx":function(){return Promise.all([t.e(0),t.e(3)]).then(t.bind(null,"./docs/animations/AnimatedClipRect.mdx"))},"docs/charts/BarChart.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(4)]).then(t.bind(null,"./docs/charts/BarChart.mdx"))},"docs/charts/LineChart.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(5)]).then(t.bind(null,"./docs/charts/LineChart.mdx"))},"docs/hooks/useContainerDimension.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(6)]).then(t.bind(null,"./docs/hooks/useContainerDimension.mdx"))},"docs/layers/ResponsiveLayer.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(8)]).then(t.bind(null,"./docs/layers/ResponsiveLayer.mdx"))},"docs/legend/legend.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(9)]).then(t.bind(null,"./docs/legend/legend.mdx"))},"docs/themes/Theme.mdx":function(){return Promise.all([t.e(0),t.e(1),t.e(10)]).then(t.bind(null,"./docs/themes/Theme.mdx"))}},c=t("./.docz/app/db.json"),u=function(){return o.a.createElement(s.a,{linkComponent:d.b,db:c},o.a.createElement(d.e,{imports:l}))},p=[],h=[],f=function(){return h.forEach(function(e){return e&&e()})},m=document.querySelector("#root");!function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u;p.forEach(function(e){return e&&e()}),i.a.render(o.a.createElement(e,null),m,f)}(u)},0:function(e,n,t){e.exports=t("./.docz/app/index.jsx")}});
//# sourceMappingURL=app.8102faf3b1c166c7b291.js.map