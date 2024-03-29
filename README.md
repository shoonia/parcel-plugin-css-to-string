# parcel-plugin-css-to-string

![support parcel v1](https://img.shields.io/badge/Parcel-v1-3638f4)
[![test status](https://github.com/shoonia/parcel-plugin-css-to-string/workflows/test/badge.svg)](https://github.com/shoonia/parcel-plugin-css-to-string/actions)
[![npm version](https://img.shields.io/npm/v/parcel-plugin-css-to-string.svg)](https://www.npmjs.com/package/parcel-plugin-css-to-string)

Importing CSS files as a string to JavaScript.

Transform plugin for **Parcel v1**

> Support **Parcel v2**: [parcel-transformer-css-to-string](https://github.com/shoonia/parcel-transformer-css-to-string)

**styles.css**
```css
.text {
  color: #162D3D;
}
```
**index.js**
```js
import styles from "./styles.css";

console.log(styles); // ".text{color:#162D3D}"
```

## Install
```bash
npm i --save-dev parcel-plugin-css-to-string
# or
yarn add -D parcel-plugin-css-to-string
```

## How to use
I'm recommending to use the custom extension to your styles which will be imported as a string. It will help to escape conflicts with `.css` files for global styles or css-modules. The default asset type `css`.

You can add the list of your custom extensions to `.parcelrc` config. [Syntax highlight custom extension](#developer-tools)

For example: `styles.cssx`.

**.parcelrc**
```json
{
  "parcel-plugin-css-to-string": {
    "assetType": ["cssx"]
  }
}
```

## Example
Web component styles via the Shadow DOM
```bash
my-app
├── src
│   ├── styles.cssx
│   └── index.js
└── .parcelrc
```

**src/styles.cssx**
```css
.title {
  text-align: center;
}
```
**src/index.js**
```js
import styles from "./styles.cssx";

const root = document.createElement("div");

root.innerHTML = `
<style>${styles}</style>
<div>
  <h1 class="title">Hello!</h1>
</div>
`;

class MyWebComponent extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" }).appendChild(root);
  }
}

window.customElements.define("my-web-component", MyWebComponent);
```

## Plugin options

your `.parcelrc`
```json
{
  "parcel-plugin-css-to-string": {
    "assetType": ["css"],
    "minify": true,
    "enableCSS": false
  }
}
```
or `package.json`
```diff
{
  "name": "my_package",
  "description": "",
  "version": "1.0.0",
  "main": "index.js",
  "devDependencies": {
    "parcel-bundler": "^1.x",
    "parcel-plugin-css-to-string": "^2.x"
  },
+  "parcel-plugin-css-to-string": {
+    "assetType": ["css"],
+    "minify": true,
+    "enableCSS": false
+  }
}
```

| Name           | Type              | Default   | Description |
|:--------------:|:-----------------:|:---------:|:-----------:|
| **assetType**  | `{Array<string>}` | `["css"]` | List of asset types imported to javascript as a string.
| **minify**     | `{Boolean}`       | `true`    | on/off minification
| **enableCSS**  | `{Boolean}`       | `false`   | on/off the generation of CSS files

### Minify config
You can configure minify CSS in production build, where custom configuration can be set by creating `cssnano.config.js` file

**cssnano.config.js**
```js
module.exports = {
  preset: [
    "default",
    {
      calc: false,
      discardComments: {
        removeAll: true
      }
    }
  ]
}
```

### PostCSS
You can configure CSS transforming with PostCSS creating a configuration file using one of these names: `.postcssrc` (JSON), `.postcssrc.js`, or `postcss.config.js`.

> `.postcssrc` config omit `.parcelrc` option `minify`.
> If you use PostCSS config then you need added `cssnano` plugin to minify production build.

**.postcssrc**
```js
{
  "plugins": {
    "postcss-import": {},
    "autoprefixer": {},
    "cssnano": {}
  }
}
```

## Developer tools
You can configure how the IDE will parse the files with custom extension.

### VS Code
Add to the root folder of your project a new folder `.vscode` with file `settings.json`
```bash
my-app
├── .vscode
│   └── settings.json
├── src
│   ├── styles.cssx
│   └── index.js
└── .parcelrc
```
**.vscode/settings.json**
```json
{
  "files.associations": {
    "*.cssx": "css",
    ".parcelrc": "json",
    ".postcssrc": "json"
  }
}
```
- [VS Code: Language Identifiers](https://code.visualstudio.com/docs/languages/identifiers)

## License
[MIT](./LICENSE)
