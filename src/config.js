const util = require('util');
const fs = require('fs');
const path = require('path');

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

const { assetType, autoprefixer, minify } = config;

module.exports = {
  assetType: Array.isArray(assetType) ? assetType : ['css'],
  autoprefixer: util.isBoolean(autoprefixer) ? autoprefixer : true,
  minify: util.isBoolean(minify) ? minify : true,
};
