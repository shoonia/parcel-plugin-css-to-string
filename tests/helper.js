const path = require('path');
const Bundler = require('parcel-bundler');
const fse = require('fs-extra');
const nanoid = require('nanoid');

const outDir = path.join(__dirname, './__dist__');

function bundle(entry, outFile) {
  if (!outFile) throw new Error();

  const bundler = new Bundler(entry, {
    outDir,
    outFile,
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
  randomName: () => `index.${nanoid()}.js`,
  require: (fileName) => require(path.join(outDir, fileName)),
  emptyDir: () => fse.emptyDirSync(outDir),
  rmDir: () => fse.removeSync(outDir),
  mockCWD: (dir) => jest.spyOn(process, 'cwd').mockReturnValue(dir),
};
