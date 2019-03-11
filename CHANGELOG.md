# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Add Apache License. (#23)
- Add release script. (#21)
- Add auto type check with github action. (#20)
- Add webpack bundle build. (#19)
- Add `test` and `test:watch` scripts in root directory and every single package.(#17)
- Add `jest`, `ts-jest`, `enzyme`, `enzyme-adapter-react-16` dependency.(#17)
- Add a sample test of `ResponsiveLayer`. (#17)
- Add a custom effect `useChartDimensions` to calculate the outer and inner dimension of the chart. (#16)
- Add `useCartesianEncodings` to calculate the processed data and the visual encodings that we need in order to draw the graph. (#16)
- Add a <SvgWithAxisFrame> component to deal with the size of the chart container, SVG, and the axes that generally used across different charts. (#16)
- Add `type-check` and `type-check:watch` script in package.json. (#15)
- Add legend setting in color encoding and show `<Legend>` in `<LineChart>`. (#14)
- Add `getColorScale` to receive color encoding in charts. (#11)
- Extract the animation frame controls as a custom effect hook. (#10)
- Add `tslint-react-hooks` rules to lint React Hooks. (#8)
- Add `ThemeProvider` and color / xy axis themes config for customize theme. (#6)
- Create an animation package, and add a simple SVG clipping animation: `<AnimatedClipRect>`. (#4)
- Add `<HoverLayer>` to reuse the hovering interactions logic across different graphs. (#3)
- Add the tooltip and hovered effects in `<LineChart>`. (#3)
- Add the hovering information in `<DataLayer>`. (#3)
- Add `getSelectorsByField` in `<DataLayer>` to select and convert the data value in a record. (#3)
- Add a simple `<LineChart>`. (#2)
- Add `<DataLayer>` to reuse the data calculations (such as domain and range computations) logic. (#2)
- Add `<AxisLayer>` to reuse the axes on the charts. (#2)
- Sets up the development environment for developing React components using `Typescript`. (#1)
- Integrates the `docz` documentation system to develop the graphics components and help developers use the library we develop. (#1)
- Makes simple components such as `<Foo>` and `<ResponsiveLayer>` as an experiment to see if the project settings go well. (#1)

# Changed
- Reset `private: true` in root package.json. (#24)
- Remove author field in package.json. (#23)
- Replace `lodash-es` with `lodash`.(#17)
- Remove `selectors` from `AxisScale` and `ColorScale`. (#16)
- Modify the config of `tslint` so that it won't continuing warning about the lack of dangling commas in functions. (#16)
- Fix `HoverLayer` default props. (#14)
- Fix color too light / deep with ordinal data field. (#14)
- Rewrite `<HoverLayer>` using Hooks. (#10)
- Remove `AxisConfig` type. Add new `Encoding` (`AxisEncoding`) and `Scale` (`AxisScale`) type for `getAxisScale`. (#9)
- Replace `fieldX` `fieldY` `scaleX` `scaleY` with `x` and `y` props in `LineChart`. (#9)
- Rewrite functionality of `<DataLayer>` by hooks. (#9)
- Use Hooks to rewrite functionalities of `<ResponsiveLayer>`. (#8)
- Refactor the way getting width and height in `<LineChart>`. (#8)
- Fix `yarn lint` command. (#7)
- Upgrade React to 16.8. (#4)
- Upgrade react-spring to the latest version which uses hooks. (#4)
