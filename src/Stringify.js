const Asset = require('parcel-bundler/src/Asset');
const { minify, autoprefixer } = require('./config.js');

const postcss = require('postcss')(
  [
    autoprefixer && require('autoprefixer'),
    minify && require('cssnano'),
  ]
    .filter(Boolean),
);

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

    const { css } = await postcss.process(string);

    this.code = wrap(css);
  }

  async generate() {
    return { js: this.code };
  }
}

module.exports = Stringify;
