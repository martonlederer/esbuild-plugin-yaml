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

### Usage

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
