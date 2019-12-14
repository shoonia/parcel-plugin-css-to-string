const path = require('path');
const Bundler = require('parcel-bundler');
const fse = require('fs-extra');

const outDir = path.join(__dirname, './__dist__');

function bundle(entry) {
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

  jest.isolateModules(() => {
    require('../src')(bundler);
  });

  return bundler.bundle();
}

module.exports = {
  bundle,
  require: () => require(outDir),
  emptyDir: () => fse.emptyDirSync(outDir),
  rmDir: () => fse.removeSync(outDir),
};
