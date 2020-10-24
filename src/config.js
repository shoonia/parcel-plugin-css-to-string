const { existsSync, readFileSync, realpathSync } = require('fs');
const { join } = require('path');
const postcssrc = require('postcss-load-config');

const root = realpathSync(process.cwd());

const isObject = (value) => value !== null && typeof value === 'object';
const isBoolean = (value) => typeof value === 'boolean';

const { minify, assetType, enableCSS } = (() => {
  const parcelrc = join(root, '.parcelrc');
  const PLUGIN_NAME = 'parcel-plugin-css-to-string';

  if (existsSync(parcelrc)) {
    try {
      const str = readFileSync(parcelrc, 'utf8');
      const config = JSON.parse(str);

      if (
        isObject(config) &&
        isObject(config[PLUGIN_NAME])
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
    const pkg = join(root, 'package.json');

    if (existsSync(pkg)) {
      const config = require(pkg);

      if (isObject(config[PLUGIN_NAME])) {
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
    const isMinify = isBoolean(minify) ? minify : true;
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
  enableCSS: isBoolean(enableCSS) ? enableCSS : false,
  options,
  plugins
};
