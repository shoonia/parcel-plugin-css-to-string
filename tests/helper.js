const path = require('path');
const Bundler = require('parcel-bundler');
const fse = require('fs-extra');

const plugin = require('../src');

const outDir = path.join(__dirname, './dist');

function createBundler(dirname) {
  const entry = path.join(dirname);
  const bundler = new Bundler(entry, {
    outDir,
    outFile: 'index.js',
    watch: false,
    cache: false,
    hmr: false,
    logLevel: 0,
    minify: false,
    sourceMaps: false,
    autoInstall: false,
  });

  plugin(bundler);

  return bundler;
}

module.exports = {
  createBundler,
  require: () => require(outDir),
  emptyDir: () => fse.emptyDirSync(outDir),
  rmDir: () => fse.removeSync(outDir),
};
