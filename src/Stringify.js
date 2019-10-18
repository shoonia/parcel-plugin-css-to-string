const { Asset } = require('parcel-bundler');

const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

class Stringify extends Asset {
  constructor(name, options) {
    super(name, options);
    this.type = 'js';
    this.code = '';
  }

  async parse(string) {
    const css = await postcss([autoprefixer, cssnano])
      .process(string)
      .then((result) => result.css);

    this.code = `module.exports = ${JSON.stringify(css)}`;
  }

  async generate() {
    return { js: this.code };
  }
}

module.exports = Stringify;
