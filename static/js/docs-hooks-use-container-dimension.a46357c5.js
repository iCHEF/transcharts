(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./docs/hooks/useContainerDimension.mdx":function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return c});var i=t("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),o=(t("./node_modules/react/index.js"),t("./node_modules/@mdx-js/react/dist/index.es.js")),s=(t("./node_modules/docz/dist/index.esm.js"),t("./packages/graph/src/index.ts"),{}),a="wrapper";function c(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(o.b)(a,Object.assign({},s,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("h1",{id:"usecontainerdimension"},"useContainerDimension"),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"useContainerDimension")," hook help you get the bounding ",Object(o.b)("inlineCode",{parentName:"p"},"dimension")," (an object with ",Object(o.b)("inlineCode",{parentName:"p"},"width")," and ",Object(o.b)("inlineCode",{parentName:"p"},"height"),") of a DOM node."),Object(o.b)("p",null,"By combining ",Object(o.b)("inlineCode",{parentName:"p"},"useRef"),", you can easily get the width and height of a DOM node:"),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const graphRef = useRef(null);\nconst { width, height } = useContainerDimension(graphRef);\n\nreturn (\n  <div ref={graphRef}>\n    ...\n  </div>\n);\n")),Object(o.b)("h2",{id:"advanced-usage"},"Advanced Usage"),Object(o.b)("h3",{id:"customizing-the-debouncetime"},"Customizing the ",Object(o.b)("inlineCode",{parentName:"h3"},"debounceTime")),Object(o.b)("p",null,"The ",Object(o.b)("inlineCode",{parentName:"p"},"useContainerDimension")," hook utilizes the ",Object(o.b)("a",Object.assign({parentName:"p"},{href:"https://developers.google.com/web/updates/2016/10/resizeobserver"}),"ResizeObserver"),"\nto listen to the changes in the dimension of element\u2019s content rectangle."),Object(o.b)("p",null,"To avoid updating the dimension too frequently, we set a debounce time for updating such change."),Object(o.b)("p",null,"The default ",Object(o.b)("inlineCode",{parentName:"p"},"debounceTime")," is 300 ms, and you can customize it by setting the second parameter of ",Object(o.b)("inlineCode",{parentName:"p"},"useContainerDimension"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object.assign({parentName:"pre"},{className:"language-jsx"}),"const { width, height } = useContainerDimension(graphRef, 100);\n")))}c&&c===Object(c)&&Object.isExtensible(c)&&Object.defineProperty(c,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/hooks/useContainerDimension.mdx"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-hooks-use-container-dimension.408cce6c786cbba56909.js.map