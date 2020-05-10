const Asset = require('parcel-bundler/src/Asset.js');
const postcss = require('postcss');
const { options, plugins, enableCSS } = require('./config.js');

class Stringify extends Asset {
  constructor(...args) {
    super(...args);
    this.type = 'js';
  }

  parse(string) {
    if (plugins.length < 1) {
      return string;
    }

    return postcss(plugins)
      .process(string, { from: this.name, ...options })
      .then((res) => res.css);
  }

  generate() {
    return  {
      css: enableCSS && this.ast,
      js: `module.exports = ${JSON.stringify(this.ast)}`,
    };
  }
}

module.exports = Stringify;
