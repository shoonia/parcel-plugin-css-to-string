const Asset = require('parcel-bundler/src/Asset.js');
const postcss = require('postcss');
const { options, plugins } = require('./config.js');

class Stringify extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'js';
  }

  parse(string) {
    if (plugins.length < 1) {
      return string;
    }

    const _options = Object.assign({ from: this.name }, options);

    return postcss(plugins)
      .process(string, _options)
      .then((res) => res.css);
  }

  generate() {
    return `module.exports = ${JSON.stringify(this.ast)}`;
  }
}

module.exports = Stringify;
