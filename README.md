# esbuild-plugin-yaml

Use YAML files as ES6 modules with `esbuild`.

## Install

```sh
yarn add -D esbuild-plugin-yaml
```

or

```sh
npm i -D esbuild-plugin-yaml
```

## Usage

Add to your esbuild plugins list:

```js
const esbuild = require("esbuild");
const { yamlPlugin } = require("esbuild-plugin-yaml");

esbuild.build({
  ...
  plugins: [
    yamlPlugin()
  ]
  ...
});
```

## Options

You can add your own custom configuration of options to `esbuild-plugin-yaml`:

```js
yamlPlugin({
  // options
});
```

### `loadOptions`

LoadOptions by [`js-yaml`](https://www.npmjs.com/package/js-yaml).

### `transform`

A function which can mutate parsed YAML. It should return an `object` or `undefined` (that will make no changes to the parsed YAML).

```js
  transform(data, filePath) {
    // transform the yaml file
    // the file content will be in the "data" field
    // the file path will be in the "filePath" field
    return { filePath, data };
  }
```
