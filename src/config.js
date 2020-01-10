const util = require('util');
const fs = require('fs');
const path = require('path');
const postcssrc = require('postcss-load-config');

const root = process.cwd();

const { minify, assetType } = (() => {
  const parcelrc = path.join(root, '.parcelrc');
  const PLUGIN_NAME = 'parcel-plugin-css-to-string';

  if (fs.existsSync(parcelrc)) {
    try {
      const str = fs.readFileSync(parcelrc, 'utf8');
      const config = JSON.parse(str);

      if (
        util.isObject(config) &&
        util.isObject(config[PLUGIN_NAME])
      ) {
        return config[PLUGIN_NAME];
      }
    } catch (error) {
      console.error(
        '\n\n',
        `> ERROR: ${PLUGIN_NAME}\n`,
        '> Invalid configuration file `.parcelrc`\n',
        `> ${error}`,
        '\n\n'
      );
    }
  } else {
    const pkg = path.join(root, 'package.json');

    if (fs.existsSync(pkg)) {
      const config = require(pkg);

      if (util.isObject(config[PLUGIN_NAME])) {
        return config[PLUGIN_NAME];
      }
    }
  }
  return {};
})();

const { options, plugins } = (() => {
  try {
    return postcssrc.sync();
  } catch (error) {
    const isMinify = util.isBoolean(minify) ? minify : true;
    const isProd = process.env.NODE_ENV === 'production';

    return {
      options: {},
      plugins: isMinify && isProd
        ? [require('cssnano')]
        : []
    };
  }
})();

module.exports = {
  assetType: Array.isArray(assetType) ? assetType : ['css'],
  options,
  plugins
};
