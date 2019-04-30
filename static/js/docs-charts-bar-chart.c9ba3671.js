(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"./docs/charts/BarChart.mdx":function(e,t,a){"use strict";a.r(t),a.d(t,"default",function(){return d});var n=a("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),i=(a("./node_modules/react/index.js"),a("./node_modules/@mdx-js/react/dist/index.es.js")),r=a("./node_modules/docz/dist/index.esm.js"),o=a("./packages/chart/src/index.ts"),s=a("./docs/sampleData/lineData.js"),A=a("./docs/sampleData/multiLinesData.js"),l={},c="wrapper";function d(e){var t=e.components,a=Object(n.a)(e,["components"]);return Object(i.b)(c,Object.assign({},l,a,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"bar-chart"},"Bar Chart"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"<BarChart>")," component supports drawing bars."),Object(i.b)("p",null,"We use the following example data to generate the example charts below."),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"Example Data:")),Object(i.b)("pre",null,Object(i.b)("code",Object.assign({parentName:"pre"},{className:"language-js"}),"const lineData = [\n  { x: 0, y: 9, date: '2019/01/21 00:00:00', weekday: 'Mon' },\n  { x: 1, y: 5, date: '2019/01/22 00:00:00', weekday: 'Tue' },\n  { x: 2, y: 5, date: '2019/01/23 00:00:00', weekday: 'Wed' },\n  { x: 3, y: 3, date: '2019/01/24 00:00:00', weekday: 'Thu'},\n  { x: 4, y: 1, date: '2019/01/25 00:00:00', weekday: 'Fri' },\n];\n")),Object(i.b)("h2",{id:"using-different-scales-on-the-x-axis"},"Using different scales on the X-axis"),Object(i.b)("h3",{id:"linear--linear"},"Linear + Linear"),Object(i.b)(r.c,{__position:0,__code:"<div style={{ width: '100%', height: '320px' }}>\n  <BarChart\n    data={lineData}\n    x={{ field: 'x', type: 'quantitative', scale: 'linear' }}\n    y={{ field: 'y', type: 'quantitative', scale: 'linear' }}\n  />\n</div>",__scope:{props:this?this.props:a,Playground:r.c,Props:r.d,BarChart:o.a,lineData:s.a,multiLinesData:A.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2GvVwBHsPx7Uwo1ZXaAABWJNjASRUXcOByEogg4HNDiyJfFVUEI9V2CgNAYC1aJXCw2iPQPOBJAqX8JIIVxJFE51lNcAiIPYIhQigGIABkxLgTTpPdaRTnkxSyXEyTJD0gyIGM51TMk7SiPYQNJXM-UzXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnVKABZsvYAA2bLcvWMBgIAMW9aBElS_hnEOBEHUwGChH4JYiGoSg4AKhEaurOqaGcCBcMudgAEYSry-RAuCqYAEE5hi9gIygjjoHQMN2HkDkYrEbboxkdgUSimBuGAPCIpuuB5C3GtgD2qADuCAAyb7xkSeZKGaD6vvMbhwblMBkMlAZUHadgAH4Nn2sMIxOq4QbDZbqykGQqzfMwYWEzAwDCAztpO7gzqjHGNuXasE28ggcHqzIUivAhXprWtLuu2A7qgnF0AmVK5rStKAFJct8GAIBSQhUqTAAmNLqqOl6V25xhSPIzjNe545JLu9S7JU7GDYNrABcNCB53QVKcqWSL5lSgBHUJ3BiFSYlYGBpfY-JZvaE2yPh-RzYtmtEmtyA7dSxJpedoP3c9l5ojYP2lgD2BUpDgQw4ji3N313HYxXKQmZZtmOdeqQ6fxswvxAOSFO9WzNLUsTNP_LQKGA_QGFWkSu8kraAG11igrArjSpYWvYABOJZ0CyVKVbmhfJDSubJCVub2HFxBD_F6WRiCbYV_n9o9WoMO8osKerjmuergAVmX1e5XXzft93pWD7SkfQBJ8lhnxgBfeCqVLAMjvpPdg092BKxwO_Fob8P60DXtvH-O8lZJgAUAoBp9z6X1SgAdWyLA6sj9MovxoYbDBX8sFbxwSVfBx80pEPASQuU1gOhKDgQgxaqD5roKDt_Zhu9X5sOARw0BxDIFylZhAShABdAShMsCeRJmTKYJtNICSbi3GysAO6OSMiZbuAFtC6BAgYMCRN7RDz0gQUSLl4BmVihPKh8CZ60KXv9F27B-BJzmn1ehYimG_z3tIwhciuEKOvrfI6984o-JEcIlBScrjBIBjAJWYSV4MPaOIqJ_92GxLnPEq-0C_bJIEVcJWtDMm5OySAJO-SQCiMwRvCRuCYkgMqRAq-5D0CUIfmkpMtDJkBNmjk-YoTOnhO6dg3erDykDLAUMqBeA-EpOoUI-ez8ZmtPaQUz-xTIk4Kkes2RgzuHtCUWM1JCCxZ-Kdi0oJbTckLK6YwnpUT943M4VsuUN84Z1O8QgiqTT3mBLmXks5RSSk4LKTIipmz7k1KedQgA7DC45nzTmLMKRE_5OC8FAriSC9oIzsVpMacI6ZWTCXfMRaSlZSs1loo2fI6pOz2j8MhVcAAHLQo5zL4UdN-Rcslkj-m3IxQkx5EK1GBQcVMbR-lmzhFcRYySBilAgBGtsVwaQe7UEAjYgeYF4rVn4Kgb0jIkCfJ-MWaoGRzQ_lsn1dY_BfYCHyNQfgrS0o4FDWlH1drm7wHIP0GY3Z_TOv4GtK6hFYDQiwG3dNmAySUESLmPIBQJyah4kWP4pZI0WH4FENAwbPmqGwD3Stnyc10EwEFW2cA622u5vwPCdb-AAD05phpwCVZtVbBCagHSAYdFUcDCpwD8lc_BTSSktJEGdc6F1Lv4OsbG8gm5uu8B8agkAUjmtQJa_uoEQDxTaTAH0WRg38FjeKWg5o10WlmDMfgh7w7yCAA",mdxType:"Playground"},Object(i.b)("div",{style:{width:"100%",height:"320px"}},Object(i.b)(o.a,{data:s.a,x:{field:"x",type:"quantitative",scale:"linear"},y:{field:"y",type:"quantitative",scale:"linear"},mdxType:"BarChart"}))),Object(i.b)("h3",{id:"time--linear"},"Time + Linear"),Object(i.b)(r.c,{__position:1,__code:"<div style={{ width: '100%', height: '320px' }}>\n  <BarChart\n    data={lineData}\n    x={{ field: 'date', type: 'quantitative', scale: 'time' }}\n    y={{ field: 'x', type: 'quantitative', scale: 'linear' }}\n  />\n</div>",__scope:{props:this?this.props:a,Playground:r.c,Props:r.d,BarChart:o.a,lineData:s.a,multiLinesData:A.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2GvVwBHsPx7Uwo1ZXaAABWJNjASRUXcOByEogg4HNDiyJfFVUEI9V2CgNAYC1aJXCw2iPQPOBJAqX8JIIVxJFE51lNcAiIPYIhQigGIABkxLgTTpPdaRTnkxSyXEyTJD0gyIGM51TMk7SiPYQNJXM-UzXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnVKABZsvYAA2bLcvWMBgIAMW9aBElS_hnEOBEHUwGChH4JYiGoSg4AKhEaurOqaGcCBcMudgAEYSry-RAuCqYAEE5hi9gIygjjoHQMN2HkDkYrEbboxkdgUSimBuGAPCIpuuB5C3GtgD2qADuCAAyb7xkSeZKGaD6vvMbhwblMBkMlAZUHadgAH4Nn2sMIxOq4QbDZbqykGQqzfMwYWEzAwDCAztpO7gzqjHGNuXasE28ggcHqzIUivAhXprWtLuu2A7qgnF0AmVK5rStKAFJct8GAIBSQhUqTAAmNLqqOl6V25xhSPIzjNe545JLu9S7JU7GDYNrABcNCB53QVL0CyaXIvmVKAEdQncGIVJiVgYGl9j4lm9oYiPeH5HNi2a0Sa3IDt1KcqWF3g49r2XmiNh_aWQPYFSk2yPDyOLc3fXcdjFcpCZlm2Y516pDp_GzC_EA5IU71bM0tSxM0_8tAoYD9AYVaRO7yStoAbXWKCsCuNKlha9gAE4lkd2hUpVubF8kNK5skJW5vYcXECP8XpZGIJtkdhf2j1ahw7yixp6uOb56uABWFesnXnet53velcPmlY-QDT5LHPjAS-8FUqWAZPfKe7AZ7sCVjgD-LR36fzXnKDev9d5KyTIA4BwCz4XyvqlAA6tkOB1Yn6ZVfrQw2mD2jYO3rgkqBCT5pWIRA0hcprAdCUPAxBi00HzQwcHZhf8lZv3YSAzhYCSFQLlKzCAVCAC6AlCZYE8iTMmUwTaaQEs3VuNlYCd0ckZEyPcALaF0CBAwYEib2mHnpAgokXLwDMrFSe1CEGzzocvf6rt2D8GTnNPqDDxE_xYXvA-HCiHyO4Yom-d8joPzir40RIjUHJyuCEgGMAlbhNXpEze0SlYALiaAuciTr4wP9qkwRVwlZ0Oyfk3JIBk6FJAGI7-pTJH4MqXI6pkDr4UPQFQx-GSkx0OmYE2aeT5hhO6RE3pOC95sMGVwkZ0C8D8LSTQ4RC8X5zPaZ0opX8sFRMkdIzZCTtlKP6BM9JiCxb-KTm04JHT8lLJ6ZcvpuDYmyPicMnhyS4YNJ8YgiqLT3lBIWQU85jCJG4IqUCqp4D7ntDqU8mhAB2GFJzPlnOWcU1ZZSBloqGRi0FYycUZOaSI2ZOSiXfMRSUtZSsNmUq2aCvh7QBGQquAADjocc5l8Kum_KYVc3BNzuV3NBcotRGjnRaOJjAUm-lmzhDcZYyShilAgBGtsVwaRe7UEArYweYF4rVn4Kgb0jIkCfJ-MWaoGRzQ_lsn1dY_A_YCHyNQfg7S0o4FDWlH1dqW7wHIP0GY3Z_TOv4GtK6hFYDQiwO3dNmAySUESLmPIBQJyah4kWP4pZI0WH4FENAwbPmqGwL3Stnyc10EwEFW2cA622u5vwPCdb-AAD05phpwCVZtVbBCagHSAYdFUcBCpwD8lc_BTSSktJEGdc6F1Lv4OsbG8hm5uu8B8agkAUjmtQJageoEQDxQ6TAH0WRg38FjeKWg5o10WlmDMfgh6I7yCAA",mdxType:"Playground"},Object(i.b)("div",{style:{width:"100%",height:"320px"}},Object(i.b)(o.a,{data:s.a,x:{field:"date",type:"quantitative",scale:"time"},y:{field:"x",type:"quantitative",scale:"linear"},mdxType:"BarChart"}))),Object(i.b)("h3",{id:"point--linear"},"Point + Linear"),Object(i.b)(r.c,{__position:2,__code:"<div style={{ width: '100%', height: '320px' }}>\n  <BarChart\n    data={lineData}\n    x={{ field: 'weekday', type: 'quantitative', scale: 'point' }}\n    y={{ field: 'y', type: 'quantitative', scale: 'linear' }}\n  />\n</div>",__scope:{props:this?this.props:a,Playground:r.c,Props:r.d,BarChart:o.a,lineData:s.a,multiLinesData:A.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2GvVwBHsPx7Uwo1ZXaAABWJNjASRUXcOByEogg4HNDiyJfFVUEI9V2CgNAYC1aJXCw2iPQPOBJAqX8JIIVxJFE51lNcAiIPYIhQigGIABkxLgTTpPdaRTnkxSyXEyTJD0gyIGM51TMk7SiPYQNJXM-UzXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnVKABZsvYAA2bLcvWMBgIAMW9aBElS_hnEOBEHUwGChH4JYiGoSg4AKhEaurOqaGcCBcMudgAEYSry-RAuCqYAEE5hi9gIygjjoHQMN2HkDkYrEbboxkdgUSimBuGAPCIpuuB5C3GtgD2qADuCAAyb7xkSeZKGaD6vvMbhwblMBkMlAZUHadgAH4Nn2sMIxOq4QbDZbqykGQqzfMwYWEzAwDCAztpO7gzqjHGNuXasE28ggcHqzIUivAhXprWtLuu2A7qgnF0AmVK5rStKAFJct8GAIBSQhUqTAAmNLqqOl6V25xhSPIzjNe545JLu9S7JU7GDYNrABcNCB53QVKRiCbZ0Hg6XIvmVKAEdQncGIVJiVgYGl9j4lm9pBTQF91f17nEmtyA7dSxI3YBsPvd9l5ojYIOlhD2BUpNsj4fkc2LfYTd9dx2MVykJmWbZjnXqkOn8bML8QDkhTvVszS1LEzT_y0ChgP0BhVpE_vJK2gBtdYoKwK40qWFr2AATiWF3aFSlW5tXyQ0rmyQlbm9hxcQM_xelx2YGd-DUr1ahi7yix56uObl6uABWDesm3g-94PkfJWp80rn1AZfJY19b4r3aJYBkT857sAXuwJWOBv4tC_j_Lecod4AMPkrJMICwFgKvk7F2MCADq2QEHVlfplD-9DDbYPaLg_e-CSpEIvmlUhN9yGpWsB0JQiDkGLQwfNLBYdWGAKVp_Th4DuGQLIXfOUrMIA0IALoCUJlgTyJMyZTBNppAS7dO42VgL3RyRkTIDwAtoXQIEDBgSJvaceekCCiRcvAMysVZ60KQYvBh69_oe3YPwd2MA5p9SYZI_-bCj4ny4SQxRvDlHtAfnDI6z84r-PEWI9B4SrhhNTkrKJm8Ym7ziUrYBiSIFzhSTAuBQdMnCKuErBh-TU6FJAOEkpIAJF_wqdIwhNSFF1OgalKh6AaEvxyUmBhczgmzSKfMSJfTokDLwUfDhIyeHjLlAI9oQi_EiIYe_RZXSemlN_jg2J0jZE7OSXs9oqjpnZOQWLQJSwCmhO6anVZ_SbmDPwQk-RSSxl8LlOk15dCKrtK-Z0n5ly1llI2ZU6poLalQIhbA-BzTjlXAAOxwvOYi4pVzmFSPwcMjFoysWpMmdCnJbSxELO-csiJ5LymbKVtsmluzsUHKOTM5BAAOU58KQnst6QClhtz8H3L5Y87FLy8WaMCs4qYej9LNnCB46xkljFKBACNbYrg0iD2oIBexo8wLxWrPwVA3pGRIB-T8Ys1QMjmh_LZPq6x-CBwEPkag_AulpRwGGtKvr7Ud3gOQfoMxuz-hdfwNaV1CKwGhFgbuGbMBkkoIkXMeQCgTk1DxIsfxSxRosPwKIaAQ0_NUNgQeVafm5roJgIKts4D1rtdzfgeF638AAHpzXDTgEqLbq2CE1IOkAI6Ko4BFTgf5K5-CmklJaSIs752LuXfwdY2N5Dt3dd4D41BIApAtagK1I9QIgHit0mAPosghv4HG8UtBzTrotLMGY_Aj0l3kEAA",mdxType:"Playground"},Object(i.b)("div",{style:{width:"100%",height:"320px"}},Object(i.b)(o.a,{data:s.a,x:{field:"weekday",type:"quantitative",scale:"point"},y:{field:"y",type:"quantitative",scale:"linear"},mdxType:"BarChart"}))),Object(i.b)("h2",{id:"stacked-bar-chart"},"Stacked bar chart"),Object(i.b)("h3",{id:"nominal-color-field"},"Nominal color field"),Object(i.b)("p",null,"You can use the same properties of multi-series line charts to create stacked bar charts."),Object(i.b)(r.c,{__position:3,__code:"<div style={{ width: '100%', height: '320px' }}>\n  <BarChart\n    data={multiLinesData}\n    x={{ type: 'quantitative', field: 'x' }}\n    y={{ type: 'quantitative', field: 'y' }}\n    color={{\n      field: 'type',\n      type: 'nominal',\n    }}\n  />\n</div>",__scope:{props:this?this.props:a,Playground:r.c,Props:r.d,BarChart:o.a,lineData:s.a,multiLinesData:A.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2GvVwBHsPx7Uwo1ZXaAABWJNjASRUXcOByEogg4HNDiyJfFVUEI9V2CgNAYC1aJXCw2iPQPOBJAqX8JIIVxJFE51lNcAiIPYIhQigGIABkxLgTTpPdaRTnkxSyXEyTJD0gyIGM51TMk7SiPYQNJXM-UzXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnVKABZsvYAA2bLcvWMBgIAMW9aBElS_hnEOBEHUwGChH4JYiGoSg4AKhEaurOqaGcCBcMudgAEYSry-RAuCqYAEE5hi9gIygjjoHQMN2HkDkYrEbboxkdgUSimBuGAPCIpuuB5C3GtgD2qADuCAAyb7xkSeZKGaD6vvMbhwblMBkMlAZUHadgAH4Nn2sMIxOq4QbDZbqykGQqzfMwYWEzAwDCAztpO7gzqjHGNuXasE28ggcHqzIUivAhXprWtLuu2A7qgnF0AmVK5rStKAFJct8GAIBSQhUqTAAmNLqqOl6V25xhSPIzjNe545JLuxyjJMzTsYNg2sAF_75lSgBHUJ3BiFSYlYGBpcged0FSnL1f17nEhtyK7blR3nZeaI2A9pYvc-1LEnh-QLctmsqCgIUBYDg2459uUQ5j7PuYL1LUEiNB4jG1Oa2T7PN313HYxXKQmZZtmOdeqQ6fxswvxAOSFO9WzNLUsTNP_LQKGA_QGFWkSx8kraAG11igrArjSpYWvYABOJZ0CyVKVbmnfJDSubJCVub2HFxBb_F6WRiCbYD-39o9WoJO8osNerjmrergAFZ96HzlMfU-59L5KxvmlO-sCH5LCfjAF-8FUqWAZF_Ve7B17sCVjgYBLQgEgNoEfc-ECL5KyTDAuBcDH7P1fqlAA6tkTB1Zf6ZQARww2JCwFkLPhQkq1D75pTocghhcprAdCUFgnBi1CHzWIbNdo4D-GX0AUI-BIjEH0NQXKVmEBWEAF0BKEywJ5EmZMpjqTsipASfcB42VgCPE2zkzaSQnoBXQIEDBgSJvaOeekCCiRcvAMysUV5sOwRvThe9bazX4AXOafVuFKJUZAq-GjaHaLEbo9-n8jrfzilEhR8iCEl3YAkgGMAlbJIPjw5RfD0nQOEVkucOS37oI9gUmRVwlacLKVUq4lT5g1JAIo0hJ9VGUMyQgtpKC37MPQKwn-xSkycLWXEoZIBEm1NAQ0yZ6TBEtNmUg-ZaC8BSMKewuR29_6bIqdsqpozxm8IORQ9RxytFzPEe0fRyyik4LFjEpY5ThkwCSWMlJEzyGX2vp80RZy5Qfzht0yJOCKr9JBYMh5BdnlQteTCpWzTNGtNOT8zp_z2EAHZMX3LBXiupqTGkUKofC7JiL2iLMpcUvp8iNmgsefMCFLz9mEqOSSk5OiOkXPaNItFVwAAcnC7kCtxbs-paT3kzK-WS3JfzUXGMCn4qYFj9LNnCMEtxtje5KBACNbYrg0gT2oJ46eoEQDxWrPwVA3pGRIAeT8Ys1QMjmh_LZPq6x-DuwEPkag_AtlpRwImtKEavX93gOQfoMxuz-n9fwNaV1CKwGhFgIexbMBkkoIkXMeQCgTk1DxIsfxSyposPwKIaB40PNUNgCeraHkVroJgIKEB4Bds9dzfgeEu38AAHpzSTTgEq_a22CE1DOkA86Ko4AVTgYVK5-CmklJaSIG6t07r3fwdY2N5B9yDd4D41BIApGdagV1eh3XxW2TAH0WR438EzeKWg5oj0WlmDMfgt7k7yCAA",mdxType:"Playground"},Object(i.b)("div",{style:{width:"100%",height:"320px"}},Object(i.b)(o.a,{data:A.a,x:{type:"quantitative",field:"x"},y:{type:"quantitative",field:"y"},color:{field:"type",type:"nominal"},mdxType:"BarChart"}))),Object(i.b)("h3",{id:"quantitative-color-field"},"Quantitative color field"),Object(i.b)(r.c,{__position:4,__code:"<div style={{ width: '100%', height: '320px' }}>\n  <BarChart\n    data={[\n      { x: 1, y: 5, size: 3 },\n      { x: 3, y: -7, size: 3 },\n      { x: 3, y: -3, size: 5 },\n      { x: 3, y: -5, size: 8 },\n      { x: 9, y: 7, size: 3 },\n      { x: 7, y: 1, size: 3 },\n      { x: 7, y: -5, size: 4 },\n      { x: 4, y: -2, size: 5 },\n      { x: 1, y: 10, size: 5 },\n      { x: 6, y: 4, size: 5 },\n      { x: 8, y: 9, size: 5 },\n      { x: 9, y: 0, size: 5 },\n      { x: 5, y: 3, size: 8 },\n      { x: 3, y: 8, size: 8 },\n      { x: 4, y: 4, size: 8 },\n      { x: 10, y: 7, size: 8 },\n    ]}\n    x={{ type: 'quantitative', field: 'x' }}\n    y={{ type: 'quantitative', field: 'y' }}\n    color={{\n      field: 'size',\n      type: 'ordinal',\n    }}\n  />\n</div>",__scope:{props:this?this.props:a,Playground:r.c,Props:r.d,BarChart:o.a,lineData:s.a,multiLinesData:A.a},__codesandbox:"N4IgZglgNgpgziAXKCA7AJjAHgOgBYAuAtlEqAMYD2qBMNSIAPOhAG4AEE6AvADogAnSpQL8AfIwD0LVmJABfADQg0mXACsEyEFRp0CDSQCojvVO3YAVPBDjsAwpUwBlAIYYARpSzs8rux4wdOyuAK4ElESuBBDkrlBQAJ7sAOZ0MALRMOjsoXBoKWYWAAZUmHDu6F5YGcU47ACSYOyJlKEA5AIw7OShAhBtdniUAO7sBH4Evq4ADjPp6IotbT3uRT14MOQA1uxtU20C7OiU5EMZMIi-BAQzcIiSkikQE6EeOFREkmXwldXfTl-nm8GTM6yay1C7Gw836dHI3XcyTgBAEoRSKVgdhGLzw4xsdgqwKwSxmsH83UytkR5lscFCMHW1FSuLe9UQAEozEZJGYIEQZpQBFMAEowVzkKZgIREdidcWS9oAbj5AqFooVBAAIgB5ACy7GlkTlXQlBAAtCciMrVYLhQ5IoLUPpDTK5ThJNhXALYDbUGYxWbdXqcF0MBkABTrZhsMTrCyMPAAZjEjjVzponDVwuy7BxEx6gKJVRBAkQUmTcfMFnYjBmYgjDSmUWSztzrnQLBi1Hi7BmQju40oqRgUxe7DDmH6qBSeZgCQ5Unr8draadLskVYT0ljijMJ16RH0ODSBAAorAjzQAEKJBroCOdYQEdpc1AcpUKZRen0wHCaMgdGoWh6EQFRsymYB2AABSgVxEhSIRQgwJZoIHOx5FdY12gPAAvP1-TtSD2GvVwBHsPx7Uwo1ZXaAABWJNjASRUXcOByEogg4HNDiyJfFVUEI9V2CgNAYC1aJXCw2iPQPOBJAqX8JIIVxJFE51lNcAiIPYIhQigGIABkxLgTTpPdaRTnkxSyXEyTJD0gyIGM51TMk7SiPYQNJXM-UzXaMFUF0FFjlOXDnAIRIsXYbh2GAdYogEZ5UCudoAAZ2CTGYsHaPdqxmDsWBnVKABZsvYAA2bLcvWMBgIAMW9aBElS_hnEOBEHUwGChH4JYiGoSg4AKhEaurOqaGcCBcMudgAEYSry-RAuCqYAEE5hi9gIygjjoHQMN2HkDkYrEbboxkdgUSimBuGAPCIpuuB5C3GtgD2qADuCAAyb7xkSeZKGaD6vvMbhwblMBkMlAZUHadgAH4Nn2sMIxOq4QbDZbqykGQqzfMwYWEzAwDCAztpO7gzqjHGNuXasE28ggcHqzIUivAhXprWtLuu2A7qgnF0AmVK5rStKAFJct8GAIBSQhUqTAAmNLqqOl6V25xhSPIzjNe545JLugBtfWDbi9gsCuOalha9gAFYlnyGariTI68vN82oKtzLbauc0AHYnem2a3aUM2De912_fYc0k2Dl2HfdiPuaj32Wn9x2rpDq4AA5k4Zz2LDTgBOGOg-zxOw49ou3stq4K7tm3K9Dgva7rn3G8zhPZpKtv24tn3Foz2OlZ7q57f79u0-bpu0vHpPw8Lou04qmPh-d2bJ6XgfB7zmOy5biep9r0uY_no_F5r6f64dmP48v_Od4HtOH7t3OF6f6_T9v4e7Y3nO7Av4pw7tbC-dsK6bzzifc2ABdbG7csAC3-vMVKABHUI7gYgqRiKwGA0tIDznQKlHK6sQGJGQZFVBcoMFYJeNENg-CliEM-qlRI8N5AINrlQKAQoBYgIsCw4hcpN5jV3lQ2a7QhRFXiGI2unCI6bn1rjWMK4pBMxZmzDmr0pB03xmYL8IA5IKW9LZTSakxKaX_FoCgwF9AMFWiJSxkktqm2rGncBVxD7oCyKlFWc0S6SDSnNSQSs5rsHFogSJ4tpYjCCNsHxdt2h6moBwmuM8Y5Zx8bQPxwTAnBNCUrCJaUoklJiUsOJMAEnwVSpYBkaT1hpyVjgLOdssm-LlP4_JISlZu2iWUtKsT4mJNSgAdWyA09xt837R0NjkzpeSgk9L7v00pQyqkjLlNYDoz805_2tksbJkiulLNCZPVZ5S5wbJqXKVmEBJmwIEoTLAnkSZkymOpOyKkBKGOMTZWA5jHJGRMlYgC2hdAgQMGBIm9pHF6QIKJFy8AzKxTccXW-nj2CHwkVcfgEi5p9TmccxZBSwnFNKWsipwybnJNSf3DJI8s44vYHigGMAlaEqObkgJpylZFIuYMql1ykl1PwfS2-Y9GVLGZay-YHKQCHI6e0E5pK-kDMpVc6pSTxnoEmein2Mz04ypAPizlSqVXLPJf09ZWral4B2ek3-Mdm7GokfKxV8zlUkp6ec9VlzKm2tuf0PVe95qYuxWy3FJq2UEoVUS7l3TQnhIFTazZtK4bip9mvKVKDZqyvZWaz1FrClWoGammloqQ1py7nfXNUa3WFuJTy1VpaNUBrTTqqtEr77SsjSy6N8xY0eqbYmpWKy_WCs1Wm7Z7Rdm3w_iPF1fb83uvjQs5tPrW3-upUku5DynnOhecTGApN9LNnCIikFkkflKBACNbYrg0jWOoIBCF9iwLxWrPwVA3pGRIH7T8Ys1QMjmh_LZPq6x-B4IEPkag_Ao1pRwIhtKEGv1GPgOQfoMxuz-n_fwNa2dfzQiwKY2AxwYBkkoIkXMeQCgTk1DxIsfxSyoYsPwKIaB4P9tUNgaxrH-2YHmOGIKEB4Bcc_dzfgeEuP8AAHpzSQzgEq_G2OCE1DJkA8mKo4FzjgIdK5-CmklJaSIGmtM6b0_wdY2N5CGKA94D41BIApGfagV9djQIgHiiamAPosjwf4Jh8UtBzRGYtLMGY_BbOcPkEAA",mdxType:"Playground"},Object(i.b)("div",{style:{width:"100%",height:"320px"}},Object(i.b)(o.a,{data:[{x:1,y:5,size:3},{x:3,y:-7,size:3},{x:3,y:-3,size:5},{x:3,y:-5,size:8},{x:9,y:7,size:3},{x:7,y:1,size:3},{x:7,y:-5,size:4},{x:4,y:-2,size:5},{x:1,y:10,size:5},{x:6,y:4,size:5},{x:8,y:9,size:5},{x:9,y:0,size:5},{x:5,y:3,size:8},{x:3,y:8,size:8},{x:4,y:4,size:8},{x:10,y:7,size:8}],x:{type:"quantitative",field:"x"},y:{type:"quantitative",field:"y"},color:{field:"size",type:"ordinal"},mdxType:"BarChart"}))),Object(i.b)("h2",{id:"props"},"Props"),Object(i.b)(r.d,{of:o.a,mdxType:"Props"}))}d&&d===Object(d)&&Object.isExtensible(d)&&Object.defineProperty(d,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/charts/BarChart.mdx"}}),d.isMDXComponent=!0},"./docs/sampleData/lineData.js":function(e,t,a){"use strict";var n=[{x:0,y:9,date:"2019/01/21 00:00:00",weekday:"Mon"},{x:1,y:5,date:"2019/01/22 00:00:00",weekday:"Tue"},{x:2.5,y:5,date:"2019/01/23 00:00:00",weekday:"Wed"},{x:3,y:3,date:"2019/01/24 00:00:00",weekday:"Thu"},{x:4,y:1,date:"2019/01/25 00:00:00",weekday:"Fri"}];t.a=n,"undefined"!==typeof n&&n&&n===Object(n)&&Object.isExtensible(n)&&Object.defineProperty(n,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"lineData",filename:"docs/sampleData/lineData.js"}})},"./docs/sampleData/multiLinesData.js":function(e,t,a){"use strict";var n=[{x:0,y:9,type:"type1",date:"2019/01/21 00:00:00",weekday:"Mon"},{x:1,y:5,type:"type2",date:"2019/01/22 00:00:00",weekday:"Tue"},{x:2,y:5,type:"type2",date:"2019/01/23 00:00:00",weekday:"Wed"},{x:3,y:3,type:"type1",date:"2019/01/24 00:00:00",weekday:"Thu"},{x:4,y:1,type:"type2",date:"2019/01/25 00:00:00",weekday:"Fri"},{x:10,y:9,type:"type1",date:"2019/01/21 00:00:00",weekday:"Mon"},{x:6,y:5,type:"type2",date:"2019/01/22 00:00:00",weekday:"Tue"},{x:7,y:5,type:"type2",date:"2019/01/23 00:00:00",weekday:"Wed"},{x:2,y:3,type:"type1",date:"2019/01/24 00:00:00",weekday:"Thu"},{x:8,y:1,type:"type2",date:"2019/01/25 00:00:00",weekday:"Fri"}];"undefined"!==typeof n&&n&&n===Object(n)&&Object.isExtensible(n)&&Object.defineProperty(n,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"mutliLinesData",filename:"docs/sampleData/multiLinesData.js"}}),t.a=n,"undefined"!==typeof n&&n&&n===Object(n)&&Object.isExtensible(n)&&Object.defineProperty(n,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"mutliLinesData",filename:"docs/sampleData/multiLinesData.js"}})},"./packages/chart/src/index.ts":function(e,t,a){"use strict";var n={MARGIN:{top:20,right:20,bottom:30,left:60}};"undefined"!==typeof n&&n&&n===Object(n)&&Object.isExtensible(n)&&Object.defineProperty(n,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"DEFAULT_VALS",filename:"packages/chart/src/common/config.ts"}});var i=a("./node_modules/react/index.js"),r=a.n(i),o=a("./packages/graph/src/index.ts"),s=a("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectSpread.js"),A=300;function l(e,t,a,n){var i=e.width,r=e.height,o=t.top,l=t.right,c=t.bottom,d=t.left,g=A,u=A,p=Object(s.a)({},t);switch(n){case"left":case"right":g=i>0?i-d-l-a.width:A,u=r>0?r-o-c:A,"left"===n&&(p.left+=a.width);break;case"top":case"bottom":g=i>0?i-d-l:A,u=r>0?r-o-c-a.height:A,"top"===n&&(p.top+=a.height)}return{graphMargin:p,graphDimension:{width:g,height:u}}}l&&l===Object(l)&&Object.isExtensible(l)&&Object.defineProperty(l,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"getInnerGraphDimensionAndMargin",filename:"packages/chart/src/utils/getInnerGraphDimensionAndMargin.ts"}});var c=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{top:20,right:20,bottom:30,left:60},t=arguments.length>1?arguments[1]:void 0,a=Object(i.useRef)(null),n=Object(i.useRef)(null),r=Object(o.useContainerDimension)(a),s=Object(o.useContainerDimension)(n),A=t&&t.legend&&t.legend.orient||"right",c=Object(i.useMemo)(function(){return l(r,e,s,A)},[r,e,s,A]),d=c.graphDimension,g=c.graphMargin;return{chartRef:a,legendRef:n,outerDimension:r,graphDimension:d,graphMargin:g}};c&&c===Object(c)&&Object.isExtensible(c)&&Object.defineProperty(c,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"useChartDimensions",filename:"packages/chart/src/hooks/useChartDimensions.ts"}});var d=a("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js"),g=a("./node_modules/lodash/values.js"),u=a.n(g);function p(e,t,a,n){var i={},r={};return e.forEach(function(e,o){e.forEach(function(e){var s=t.getFormattedStringVal(e),A=a.getFormattedStringVal(e),l=t.getScaledVal(e),c=a.getScaledVal(e);i[s]||(i[s]=[],r[s]=l),i[s].push({groupIdx:o,yStrVal:A,yPos:c,color:n(e)})})}),Object.keys(i).reduce(function(e,t){var a=i[t],n={xPos:r[t]||0,xStrVal:t,groupedY:a};return[].concat(Object(d.a)(e),[n])},[]).sort(function(e,t){return e.xPos-t.xPos})}function h(e,t,a){var n={},i={};return e.forEach(function(e){e.forEach(function(e){var r=e[t],o=e[a];o>=0?n[r]=n[r]?n[r]+o:o:i[r]=i[r]?i[r]+o:o})}),[Math.min.apply(Math,[0].concat(Object(d.a)(u()(i)))),Math.max.apply(Math,[0].concat(Object(d.a)(u()(n))))]}p&&p===Object(p)&&Object.isExtensible(p)&&Object.defineProperty(p,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"getAxisProjectedValues",filename:"packages/chart/src/utils/getAxisProjectedValues.ts"}});var m=function(e,t,a,n,r,s){var A=e.width,l=e.height,c=Object(i.useMemo)(function(){var e=Object(o.getValByScaleType)(n.scale),t=function(t){return e(t[n.field])};return a.sort(function(e,a){return t(e)-t(a)})},[a,n]),d=Object(i.useMemo)(function(){var e=[s].filter(function(e){return!!e});return Object(o.getDataGroupByEncodings)(c,e)},[s,c]),g=Object(i.useMemo)(function(){var e=Object(o.getXAxisScale)({data:a,axisLength:A,encoding:n});return"linear"===n.scale&&"band"===r.scale&&e.scale.domain(h(d,r.field,n.field)),e},[a,A,n]),u=Object(i.useMemo)(function(){var e=Object(o.getYAxisScale)({data:a,axisLength:l,encoding:r});return"band"===n.scale&&"linear"===r.scale&&e.scale.domain(h(d,n.field,r.field)),e},[a,l,r]),m=Object(i.useMemo)(function(){return Object(o.getRecordFieldSelector)(g)},[g]),y=Object(i.useMemo)(function(){return Object(o.getRecordFieldSelector)(u)},[u]),B=Object(i.useMemo)(function(){return"undefined"===typeof s?null:Object(o.getColorScale)({data:a,encoding:s,colors:t.colors})},[s,a,t.colors]),x=t.colors.category[0],b=Object(i.useMemo)(function(){return B?Object(o.getRecordFieldSelector)(B).getScaledVal:function(){return x}},[B,x]),E=Object(i.useMemo)(function(){return p(d,m,y,b)},[d,m,y,b]);return{dataGroups:d,axisProjectedValues:E,scalesConfig:{x:g,y:u,color:B},rowValSelectors:{x:m,y:y,color:{getString:b}}}};m&&m===Object(m)&&Object.isExtensible(m)&&Object.defineProperty(m,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"useCartesianEncodings",filename:"packages/chart/src/hooks/useCartesianEncodings.ts"}});var y=a("./node_modules/@vx/shape/dist/vx-shape.es.js");"undefined"!==typeof SvgFrameProps&&SvgFrameProps&&SvgFrameProps===Object(SvgFrameProps)&&Object.isExtensible(SvgFrameProps)&&Object.defineProperty(SvgFrameProps,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"SvgFrameProps",filename:"packages/chart/src/frames/SvgWithAxisFrame.tsx"}});var B=function(e){var t=e.outerDimension,a=e.graphDimension,n=e.margin,i=e.data,s=e.scalesConfig,A=e.showLeftAxis,l=e.showBottomAxis,c=e.axisInBackground,d=e.svgOverlay,g=e.children,u=t.width,p=t.height,h=a.width,m=a.height,y=r.a.createElement(o.AxisLayer,{width:h,height:m,showLeftAxis:A,showBottomAxis:l,data:i,xAxis:s.x,yAxis:s.y});return r.a.createElement(r.a.Fragment,null,r.a.createElement("svg",{width:u,height:p},r.a.createElement("g",{transform:"translate(".concat(n.left,", ").concat(n.top,")")},c?r.a.createElement(r.a.Fragment,null,y,g):r.a.createElement(r.a.Fragment,null,g,y))),d)};B.defaultProps={showLeftAxis:!0,showBottomAxis:!0,axisInBackground:!0};var x=r.a.forwardRef(function(e,t){return r.a.createElement("div",{ref:t,style:{width:"100%",height:"100%",position:"relative"}},r.a.createElement(B,e))});function b(e,t){var a=t<0?0:t;return t>=e.length&&(a=e.length-1),e[a].xPos}"undefined"!==typeof x&&x&&x===Object(x)&&Object.isExtensible(x)&&Object.defineProperty(x,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"SvgWithAxisFrame",filename:"packages/chart/src/frames/SvgWithAxisFrame.tsx"}}),"undefined"!==typeof LineChartProps&&LineChartProps&&LineChartProps===Object(LineChartProps)&&Object.isExtensible(LineChartProps)&&Object.defineProperty(LineChartProps,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"LineChartProps",filename:"packages/chart/src/line/LineChart.tsx"}});var E=function(e){var t=e.hovering,a=e.projectedPoints,n=e.height;if(!t)return null;var i=a.groupedY.map(function(e){return r.a.createElement("circle",{key:"c-".concat(e.yStrVal),cx:a.xPos,cy:e.yPos,r:4.5,fill:e.color})});return r.a.createElement(r.a.Fragment,null,r.a.createElement("line",{x1:a.xPos,y1:0,x2:a.xPos,y2:n,style:{stroke:"rgba(124, 137, 147, 0.25)",strokeWidth:2}}),i)},f=function(e){var t=e.color,a=e.xSelector,n=e.ySelector,i=e.rows,o=i.map(function(e,i){return r.a.createElement("circle",{key:"c-".concat(i),cx:a.getScaledVal(e),cy:n.getScaledVal(e),r:3.5,fill:t})});return r.a.createElement(r.a.Fragment,null,r.a.createElement(y.b,{data:i,x:a.getScaledVal,y:n.getScaledVal,stroke:t,strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"}),o)},O={margin:n.MARGIN},C=function(e){var t=e.data,a=e.margin,n=e.x,A=e.y,l=e.color,d=e.showLeftAxis,g=e.showBottomAxis,u=Object(i.useContext)(o.ThemeContext),p=c(a,l),h=p.chartRef,y=p.legendRef,B=p.outerDimension,O=p.graphDimension,C=p.graphMargin,j=O.width,S=O.height,D=Object(o.useHoverState)(),I=D.clearHovering,w=D.hovering,Y=D.hoveredPoint,M=D.setHoveredPosAndIndex,k=m(O,u,t,n,A,l),v=k.dataGroups,P=k.scalesConfig,Q=k.rowValSelectors,F=k.axisProjectedValues,G=Object(i.useMemo)(function(){return v.map(function(e,t){var a=Q.color.getString(e[0]);return r.a.createElement(f,{key:"row-".concat(t),color:a,rows:e,xSelector:Q.x,ySelector:Q.y})})},[v,Q]),T=Object(i.useMemo)(function(){return F.map(function(e,t){var a=(e.xPos+b(F,t-1))/2,n=(e.xPos+b(F,t+1))/2-a;return r.a.createElement("rect",{key:"colli-".concat(t),x:a,y:0,width:n,height:S,opacity:0})})},[F,S]);return r.a.createElement(x,{ref:h,outerDimension:B,graphDimension:O,showLeftAxis:d,showBottomAxis:g,margin:C,data:t,scalesConfig:P,svgOverlay:r.a.createElement(r.a.Fragment,null,r.a.createElement(o.TooltipLayer,{hovering:w,hoveredPoint:Y,axisProjectedValues:F,graphWidth:j,graphHeight:S,margin:C}),r.a.createElement(o.LegendGroup,{color:l&&Object(s.a)({},l,P.color),ref:y}))},G,r.a.createElement(E,{hovering:w,projectedPoints:F[Y.index],height:S}),r.a.createElement(o.HoverLayer,{setHoveredPosAndIndex:M,clearHovering:I,hoverDetectionComponents:T}))};C&&C===Object(C)&&Object.isExtensible(C)&&Object.defineProperty(C,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"LineChart",filename:"packages/chart/src/line/LineChart.tsx"}}),C.defaultProps=O;var j=function(e){var t=e.hovering,a=e.x,n=e.y,i=e.width,o=e.height;return t?r.a.createElement("rect",{x:a,y:n,width:i,height:o,opacity:.5,fill:"rgba(124, 137, 147, 0.25)"}):null};"undefined"!==typeof BarChartProps&&BarChartProps&&BarChartProps===Object(BarChartProps)&&Object.isExtensible(BarChartProps)&&Object.defineProperty(BarChartProps,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"BarChartProps",filename:"packages/chart/src/bar/BarChart.tsx"}});var S={margin:n.MARGIN,paddingInner:.1},D=function(e){var t=e.data,a=e.margin,n=void 0===a?{top:20,right:20,bottom:30,left:60}:a,A=e.x,l=e.y,d=e.color,g=e.showLeftAxis,u=e.showBottomAxis,p=e.paddingInner,h=void 0===p?.1:p,y=Object(i.useContext)(o.ThemeContext),B=c(n),b=B.chartRef,E=B.legendRef,f=B.outerDimension,O=B.graphDimension,C=O.width,S=O.height,D=Object(s.a)({},A,{scale:"band",scaleConfig:{paddingInner:h}}),I=Object(s.a)({},l,{scale:"linear"}),w=m(O,y,t,D,I,d),Y=w.dataGroups,M=w.scalesConfig,k=w.rowValSelectors,v=w.axisProjectedValues,P=Object(o.useHoverState)(),Q=P.clearHovering,F=P.hovering,G=P.hoveredPoint,T=P.setHoveredPosAndIndex,U=M.x.scale,J=M.y.scale,z=U.bandwidth(),L=Object(i.useCallback)(function(e){var a=z*h,n=0===e?0:v[e].xPos-a/2;return{width:0===e||e===t.length-1?z+a/2:z+a,height:S,x:n,y:0}},[z,h]),V=Object(i.useMemo)(function(){return v.map(function(e,t){return r.a.createElement("rect",Object.assign({key:"colli-".concat(t),x:e.xPos,y:0,height:S,width:z,opacity:0},Object(s.a)({},L(t))))})},[v,S,z,L]),K=Object(i.useMemo)(function(){var e=J(0),t={},a={},n=function(n,i){if(i>=0)return t[n]||(t[n]=e),t[n]-=i,t[n];var r=a[n]?a[n]:e;return a[n]=r-i,r};return Y.map(function(t,a){return t.map(function(a,i){var o=k.color.getString(t[0]),s=k.x.getScaledVal(a),A=k.y.getScaledVal(a),l=A>=0?e-A:e-S-A;return r.a.createElement("rect",{key:"bar-".concat(i),x:s,y:n(s,l),width:z,height:Math.abs(l),fill:o})})})},[Y,M,k]);return r.a.createElement(x,{ref:b,outerDimension:f,graphDimension:O,showLeftAxis:g,showBottomAxis:u,axisInBackground:!1,margin:n,data:t,scalesConfig:M,svgOverlay:r.a.createElement(r.a.Fragment,null,r.a.createElement(o.TooltipLayer,{hovering:F,hoveredPoint:G,axisProjectedValues:v,graphWidth:C,graphHeight:S,margin:n,xOffset:z/2}),r.a.createElement(o.LegendGroup,{color:d&&Object(s.a)({},d,M.color),ref:E}))},K,r.a.createElement(j,Object.assign({hovering:F},Object(s.a)({},L(G.index)))),r.a.createElement(o.HoverLayer,{setHoveredPosAndIndex:T,clearHovering:Q,hoverDetectionComponents:V}))};D&&D===Object(D)&&Object.isExtensible(D)&&Object.defineProperty(D,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"BarChart",filename:"packages/chart/src/bar/BarChart.tsx"}}),D.defaultProps=S,a.d(t,"b",function(){return C}),a.d(t,"a",function(){return D})}}]);
//# sourceMappingURL=docs-charts-bar-chart.408cce6c786cbba56909.js.map