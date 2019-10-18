module.exports = function (bundler) {
  bundler.addAssetType('cssw', require.resolve('./Stringify.js'));
};
