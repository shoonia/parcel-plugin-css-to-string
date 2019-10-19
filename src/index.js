const util = require('util');
const fs = require('fs');
const path = require('path');

const parcelrc = path.join(process.cwd(), '.parcelrc');
const PLUGIN_NAME = 'parcel-plugin-css-to-string';

function getConfig() {
  if (fs.existsSync(parcelrc)) {
    try {
      return JSON.parse(fs.readFileSync(parcelrc, 'utf8'));
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
}

function getAssetTypes() {
  const config = getConfig();

  if (util.isObject(config)) {
    const { assetType } = config[PLUGIN_NAME];

    if (Array.isArray(assetType)) {
      return assetType;
    }
  }

  return ['css'];
}

module.exports = function (bundler) {
  const Stringify = require.resolve('./Stringify.js');
  const assets = getAssetTypes();

  assets.forEach((type) => {
    bundler.addAssetType(type, Stringify);
  });
};
