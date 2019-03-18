# Transchart

`Transchart` is a highly customizable React data visualization library made by iCHEF.

It provides:
* Ready-to-use charts
* Composable `layers` to make the custom charts that suit your needs.


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
