# parcel-plugin-css-to-string
Importing CSS files as a string to javascript.

The plugin uses [Autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://github.com/cssnano/cssnano) in production build.

**styles.css**
```css
.text {
  color: #162D3D;
}
```
**index.js**
```js
import styles from './styles.css';

console.log(styles); // ".text{color:#162D3D}"
```

## Install
```bash
# peer dependencies
yarn add -D parcel-bundler autoprefixer cssnano
# plugin
yarn add -D parcel-plugin-css-to-string

# or
npm i --save-dev parcel-bundler autoprefixer cssnano
npm i --save-dev parcel-plugin-css-to-string
```

## How to use
You can add the list of your custom extensions to escape conflicts with files for global CSS or css-modules. The default asset type `css`.

For example: `styles.cssw`

**.parcelrc**
```json
{
  "parcel-plugin-css-to-string": {
    "assetType": [
      "cssw"
    ]
  }
}
```

## Example
Web component styles via the Shadow DOM
```bash
my-app
├── src
│   ├── styles.cssw
│   └── index.js
└── .parcelrc
```

**src/styles.cssw**
```css
.title {
  text-align: center;
}
```
**src/index.js**
```js
import styles from './styles.cssw';

const root = document.createElement('div');

root.innerHTML = `
<style>${styles}</style>
<div>
  <h1 class="title">Hello!</h1>
</div>
`;

class MyWebComponent extends HTMLElement {
  connectedCallback() {
    this.$root = root.cloneNode(true);
    this.attachShadow({ mode: 'open' }).appendChild(this.$root);
  }
}

window.customElements.define("my-web-component", MyWebComponent);
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
│   ├── styles.cssw
│   └── index.js
└── .parcelrc
```
**.vscode/settings.json**
```json
{
  "files.associations": {
    "*.cssw": "css",
    ".parcelrc": "json"
  }
}
```

## License
[MIT](./LICENSE)
