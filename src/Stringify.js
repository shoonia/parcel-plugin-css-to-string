const Asset = require('parcel-bundler/src/Asset.js');
const postcss = require('postcss');
const { options, plugins } = require('./config.js');

function wrap(css) {
  return `module.exports = ${JSON.stringify(css)}`;
}

class Stringify extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'js';
    this.code = '';
  }

  async parse(string) {
    if (plugins.length < 1) {
      this.code = wrap(string);

      return;
    }
  
    const { css } = await postcss(plugins).process(string, options);

    this.code = wrap(css);
  }

  async generate() {
    return { js: this.code };
  }
}

module.exports = Stringify;
