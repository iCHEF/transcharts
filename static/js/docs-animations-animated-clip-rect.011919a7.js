(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{"./docs/animations/AnimatedClipRect.mdx":function(e,t,i){"use strict";i.r(t);var n=i("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),a=i("./node_modules/react/index.js"),o=i.n(a),d=i("./node_modules/@mdx-js/react/dist/index.es.js"),s=i("./node_modules/docz/dist/index.esm.js"),c=i("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js"),r=i("./node_modules/react-spring/web.js"),l=i("./node_modules/shortid/index.js"),p=i.n(l),A=i("./node_modules/d3-ease/src/index.js"),g="easeLinear";function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=A[e];return t||console.error("Unknown name of easing function. Check the name parameter of getD3EaseFunc."),t||A[g]}m&&m===Object(m)&&Object.isExtensible(m)&&Object.defineProperty(m,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"getD3EaseFunc",filename:"packages/animation/src/utils/getD3EaseFunc.ts"}}),"undefined"!==typeof AnimatedClipRectProps&&AnimatedClipRectProps&&AnimatedClipRectProps===Object(AnimatedClipRectProps)&&Object.isExtensible(AnimatedClipRectProps)&&Object.defineProperty(AnimatedClipRectProps,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"AnimatedClipRectProps",filename:"packages/animation/src/clip/AnimatedClipRect.tsx"}});var b=function(e){var t=e.type,i=void 0===t?"slideRight":t,d=e.width,s=void 0===d?1:d,l=e.height,A=void 0===l?1:l,g=e.duration,b=void 0===g?500:g,h=e.delay,u=void 0===h?0:h,f=e.easing,j=e.children,O=Object(n.a)(e,["type","width","height","duration","delay","easing","children"]),C=Object(a.useRef)("clipRect-".concat(p.a.generate())).current,B=Object(r.b)(function(e,t,i,n,a,o){var d={delay:n,config:{duration:a,easing:m(o)},to:{width:t,height:i,left:0,top:0}};switch(e){case"slideLeft":return Object(c.a)({},d,{from:{height:i,width:0,left:t,top:0}});case"slideUp":return Object(c.a)({},d,{from:{width:t,height:0,left:0,top:i}});case"slideDown":return Object(c.a)({},d,{from:{width:t,height:0,left:0,top:0}});case"slideRight":default:return Object(c.a)({},d,{from:{height:i,width:0,left:0,top:0}})}}(i,s,A,u,b,f)),w=B.left,y=B.top,E=B.width,R=B.height;return o.a.createElement(o.a.Fragment,null,o.a.createElement("clipPath",{id:C},o.a.createElement(r.a.rect,Object.assign({x:w,y:y,width:E,height:R},O))),o.a.createElement("g",{clipPath:"url(#".concat(C,")")},j))};"undefined"!==typeof b&&b&&b===Object(b)&&Object.isExtensible(b)&&Object.defineProperty(b,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"AnimatedClipRect",filename:"packages/animation/src/clip/AnimatedClipRect.tsx"}}),i.d(t,"default",function(){return f});var h={},u="wrapper";function f(e){var t=e.components,i=Object(n.a)(e,["components"]);return Object(d.b)(u,Object.assign({},h,i,{components:t,mdxType:"MDXLayout"}),Object(d.b)("h1",{id:"clipping-rectangle"},"Clipping Rectangle"),Object(d.b)("p",null,"You can make an inner SVG element be clipped by an animated rectangle by wrapping it into ",Object(d.b)("inlineCode",{parentName:"p"},"<AnimatedClipRect>"),"."),Object(d.b)("p",null,"The default animation direction is enlarging the clipping rectangle from the left to the right, i.e., ",Object(d.b)("inlineCode",{parentName:"p"},"slideRight"),".\nWhile it supports four kinds of directions (",Object(d.b)("inlineCode",{parentName:"p"},"slideRight"),", ",Object(d.b)("inlineCode",{parentName:"p"},"slideLeft"),", ",Object(d.b)("inlineCode",{parentName:"p"},"slideUp"),", ",Object(d.b)("inlineCode",{parentName:"p"},"slideDown"),"), and you can modify it directly through the playground below to see different effects."),Object(d.b)("p",null,"Additionally, the ",Object(d.b)("inlineCode",{parentName:"p"},"easing")," options corresponds to the names of the ",Object(d.b)("a",Object.assign({parentName:"p"},{href:"https://github.com/d3/d3-ease"}),"d3-ease")," functions.\nYou may refer to its ",Object(d.b)("a",Object.assign({parentName:"p"},{href:"https://github.com/d3/d3-ease"}),"document")," to choose a desirable easing effect."),Object(d.b)(s.c,{__position:0,__code:'<svg width={550} height={50}>\n  <AnimatedClipRect\n    width={550}\n    height={50}\n    type="slideRight"\n    duration={1500}\n    easing="easeCubic"\n  >\n    <rect width={550} height={50} rx={10} style={{ fill: \'#2f98f7\' }} />\n  </AnimatedClipRect>\n</svg>',__scope:{props:this?this.props:i,Playground:s.c,Props:s.d,AnimatedClipRect:b},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2AAQVQfksnQewoAgGYxUldhMKNWV2gAAViTYwEkVF3Dgcg_GFOBzXcCju1QAiIPYQMGOYk1NXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnUyABZrPYAA2azbPWMBgIAMW9aBElM_hnEOBEHUwGChH4JYiGoSg4AchEfOrPyaGcCBcMudgAEYXLs-RFOUqYSLmHT2AjKD-OgdAw0YjkdLEKroxkdgUS0mBuGAPCNK6uB5C3GtgFqqB6uCAAySbxkSeZKGaMaJvMbhVrlMBkMlAZxPYAB-DY6rDCMmquJaw2K6spBkKs3zMGF1WOGAwDCKApmO5rWsu8rl2rBNpIIHB_MyFIrwIYaa1rOBWFnHF0AmHqAFYEbMzDNggFJCERlHwYh2syNE7JqNo-jRF-3GLFh-HgCRlGV3JtGMYILGLvJiHNPmPgQDgGjMBFdHCH4OncfQPpom2nq8uR2myfJ8V8hnTm5Zgew3liQWZZrHHycYLoGMpvBEeR1GYH5pnqZRicsAli3OtgHqoMgBJTIAYgAJjAABOAAOMAAHZ2kYzDNyF7d8aiWgqJouitjBoWpChlIcakf7AeB0Hhqkb6brML8QBS7ZXDSf84GoQDdBAgwwP06t-FQb1GSQdh-B-Ytqgyc0fzJBu7IsfhWAyfJqH4K5-DMnAx7MuL1n4cpyH6GYxOHpuQBIjrCNgaEsG9LvHrJShElzPICgnTVzRbv5SynmuQCiNAl_4VRsGLq_e5ATB5nDJSIHgJfq4hme1L3xAAAPTyuPHALkX41n4KaSUQDQEeRwF7HAeUoGv1gRaK08C8qIOQagkA6wLryFzq3bwHxqCQBSMXUu2hy76AYPpEAtAfRZGHs3U0tBzQYOEnMfgxD5ACKAA",mdxType:"Playground"},Object(d.b)("svg",{width:550,height:50},Object(d.b)(b,{width:550,height:50,type:"slideRight",duration:1500,easing:"easeCubic",mdxType:"AnimatedClipRect"},Object(d.b)("rect",{width:550,height:50,rx:10,style:{fill:"#2f98f7"}})))),Object(d.b)("h2",{id:"props"},"Props"),Object(d.b)(s.d,{of:b,mdxType:"Props"}))}f&&f===Object(f)&&Object.isExtensible(f)&&Object.defineProperty(f,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/animations/AnimatedClipRect.mdx"}}),f.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-animations-animated-clip-rect.408cce6c786cbba56909.js.map