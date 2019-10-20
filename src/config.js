const util = require('util');
const fs = require('fs');
const path = require('path');
const postcssrc = require('postcss-load-config');

const parcelrc = path.join(process.cwd(), '.parcelrc');
const PLUGIN_NAME = 'parcel-plugin-css-to-string';

const config = (() => {
  if (fs.existsSync(parcelrc)) {
    try {
      const str = fs.readFileSync(parcelrc, 'utf8');
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

function getPostcssrc() {
  const isAfx = util.isBoolean(config.autoprefixer) ? config.autoprefixer : true;
  const isCnn = util.isBoolean(config.minify) ? config.minify : true;

  return postcssrc()
    .catch(() => {
      return {
        options: {},
        plugins: [
          isAfx && require('autoprefixer'),
          isCnn && require('cssnano'),
        ]
          .filter(Boolean),
      };
    });
}

module.exports = {
  assetType: Array.isArray(config.assetType) ? config.assetType : ['css'],
  getPostcssrc,
};
