# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Add auto release script and github action. (#28)
- Add `useWorkspaces` in Lerna's config to allow lerna bootstrap to run. (#35)
- Add the deployment script to publish the compiled `docz` docs. (#36)
- Add `<HeaderBox>` to display the chart title and chart descriptions. (#39)
- Support drawing the horizontal bar chart. (#40)
- Add a gray auxiliary line at zero-value. (#40)
- Add docs for building custom charts. (#41)

# Changed
- Clean compiled files before the docz server started. (#34)
- Prevent docz from throwing TypeError. (#34)
- Support multiple value display when there are multiple points on the same x positions. (#33)
- Rename the collisionComponents as hoverDetectionComponents to made the name more intelligible. (#33)
- Upgrade `docz` to `1.0.4` to increase the build speed when developing the project. (#35)
- Prevent Jest tests from being checked by `ForkTSCheckerWebpackPlugin` of docz when developing. (#35)
- Display labels of the fields along with the axes. (#39)
- Re-organize the structure of the document, and add the introduction of the project. (#39)
- Disable tslint on the length of the comments. (#40)
- Disable the checking of unused variables on development. (#40)

# Fixed
- Fix the typing problems raised by `@types/styled-components` and `react-spring`. (#35)
- Fix the visual details of charts (#42):
  - Fix the margin of bar charts with the title bar.
  - Make the tooltips fit the size of the content.
  - Remove the white background of the legend.

## [0.0.2]

### Added
- Add Apache License. (#23)
- Add vertical bar charts and vertical stacked bar charts. (#22)
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
- Change the default tslint `defaultSeverity` settings for docz from `error` to `warning`. (#32)
- Reset `private: true` in root package.json. (#24)
- Remove author field in package.json. (#23)
- Replace `lodash-es` with `lodash`.(#17)
- Remove `selectors` from `AxisScale` and `ColorScale`. (#16)
- Allow the axes appear in the foreground. (#22)
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
