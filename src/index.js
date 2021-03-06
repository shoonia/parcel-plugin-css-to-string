const { assetType } = require('./config.js');

module.exports = (bundler) => {
  const Stringify = require.resolve('./Stringify.js');

  assetType.forEach((type) => {
    bundler.addAssetType(type, Stringify);
  });
};
