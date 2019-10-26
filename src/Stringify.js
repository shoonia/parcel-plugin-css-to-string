const Asset = require('parcel-bundler/src/Asset.js');
const postcss = require('postcss');
const { getPostcssrc } = require('./config.js');

function wrap(css) {
  return `module.exports = ${JSON.stringify(css)}`;
}

class Stringify extends Asset {
  constructor(name, options) {
    super(name, options);
    this.IS_DEV = options.env.NODE_ENV === 'development';
    this.type = 'js';
    this.code = '';
  }

  async parse(string) {
    if (this.IS_DEV) {
      this.code = wrap(string);

      return;
    }

    const { plugins, options } = await getPostcssrc();
    const { css } = await postcss(plugins).process(string, options);

    this.code = wrap(css);
  }

  async generate() {
    return { js: this.code };
  }
}

module.exports = Stringify;
