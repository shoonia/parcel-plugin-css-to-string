const util = require('util');
const fs = require('fs');
const path = require('path');
const postcssrc = require('postcss-load-config');

const root = process.cwd();

const parcelConfig = (() => {
  const config = path.join(root, '.parcelrc');
  const PLUGIN_NAME = 'parcel-plugin-css-to-string';

  if (fs.existsSync(config)) {
    try {
      const str = fs.readFileSync(config, 'utf8');
      const json = JSON.parse(str);

      if (
        util.isObject(json) &&
        util.isObject(json[PLUGIN_NAME])
      ) {
        return json[PLUGIN_NAME];
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
  }
  return {};
})();

const cssnanoConfig = (() => {
  const config = path.join(root, 'cssnano.config.js');

  if (fs.existsSync(config)) {
    return require(config);
  }

  return null;
})();

const { options, plugins } = (() => {
  const isMinify = util.isBoolean(parcelConfig.minify) ? parcelConfig.minify : true;
  const isProd = process.env.NODE_ENV === 'production';

  try {
    return postcssrc.sync();
  } catch (error) {
      return {
        options: {},
        plugins: isMinify && isProd
          ? [
            require('cssnano')(
              cssnanoConfig == null
                ? { preset: 'default' }
                : cssnanoConfig,
            ),
          ]
          : [],
      };
    }
})();

module.exports = {
  assetType: Array.isArray(parcelConfig.assetType) ? parcelConfig.assetType : ['css'],
  options,
  plugins,
};
