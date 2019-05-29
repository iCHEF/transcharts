# Transchart

`Transchart` is a highly customizable React data visualization library made by [iCHEF](https://www.ichefpos.com/).

It consists of the following packages:
- **chart** (`@ichef/transcharts-chart`): Ready-to-use charts with highly transformable syntaxes.
- **graph** (`@ichef/transcharts-graph`): Composable graph components / hooks to make the custom charts which suit your needs.
- **animation** (`@ichef/transcharts-animation`): Components / hooks to make animations for custom charts.

## The **chart** package

Unlike most React chart libraries which mix the data processing with charts,
`@ichef/transcharts-chart` aims at providing charts for the **data exploration** purposes inspired by the syntaxes of [vega-lite](https://vega.github.io/vega-lite/).

Its focus on the exploratory data visualization makes it highly suitable for visualizing data in dashboards.

For example, you can simply transform a line chart to a bar chart only by replacing the name of the component:

![Line Chart](https://user-images.githubusercontent.com/1139698/57834464-ecc89180-77ee-11e9-9cf0-52796ba48c87.jpg)

```jsx
  <LineChart
    title="Taiwan's GDP Per Capita"
    titleAlign="center"
    data={taiwanData}
    x={{ field: 'year', type: 'ordinal' }}
    y={{ field: 'gdpPercap', type: 'quantitative' }}
  />
```

![Bar Chart](https://user-images.githubusercontent.com/1139698/57834469-f05c1880-77ee-11e9-9e27-500a053e7247.jpg)

```jsx
  <BarChart
    title="Taiwan's GDP Per Capita"
    titleAlign="center"
    data={taiwanData}
    x={{ field: 'year', type: 'ordinal' }}
    y={{ field: 'gdpPercap', type: 'quantitative' }}
  />
```

From the example above, you can see that the only difference between the two is the name of the component,
i.e., by changing the name from `LineChart` to `BarChart`, it gives you the exact chart with the same data.

Such highly-transformable feature is realized through separating the data handlings from the charts,
which prevents you from touching each data point.
By intuitively selecting the **fields** on the axes and assigning their data types, `@ichef/transcharts-chart` visualizes the fields of the data for you.

On the contrary, most other React chart libraries require you manually handle every data point like the example below,
which not only makes it harder to change them to other types of charts but also adds up the complexity in maintaining the dashboard.

```jsx
<OtherReactPlot>
  <Line data={[{x: 1962, y: 1822.8790}, {x: 1967, y: 2643.8587}, {x: 1972, y: 4062.5239}]} />
</OtherReactPlot>
```

<small>(Data Source of the charts: <a href="https://www.gapminder.org/" target="_blank">GapMinder</a>)</small>


## The **graph** and **animation** package

`@ichef/transcharts-graph` and `@ichef/transcharts-animation` provides components used in `@ichef/transcharts-chart` package.
If you like to make custom charts which are not supported by `@ichef/transcharts-chart`, you may integrate these packages to make your own graphs.


## Develop

To install all dependencies before you start, simply run `yarn install`.

To run the `docs` and start developing the graph components, use the `yarn start` script.

### Releasing

Steps:

1. Create a release branch release/x.y.z

2. (Optionally) release beta builds with yarn release:beta.

3. Bump version for package.json and CHANGELOG.

4. Bump children packages version with script:

```
yarn bumpversion
```

This will run `lerna version`, which updates all package.json files in packages/.

5. Commit above changes, then create a pull request for this release branch.

6. Once it's merged into master, run `yarn release` to manually release. (TODO: add auto release when merged into master on github)

7. Backport changes from master back to develop by creating a backport/x.y.y branch and create a pull request for that.

## LICENSE

This project is licensed under the terms of the [Apache License 2.0](https://github.com/iCHEF/transcharts/blob/develop/LICENSE).
