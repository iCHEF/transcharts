# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
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
- Fix `yarn lint` command. (#7)
- Upgrade React to 16.8. (#4)
- Upgrade react-spring to the latest version which uses hooks. (#4)
