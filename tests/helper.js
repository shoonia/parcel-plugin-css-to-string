const path = require('path');
const fs = require('fs');
const Bundler = require('parcel-bundler');
const nanoid = require('nanoid');

const outDir = path.join(__dirname, './__dist__');

if (!fs.existsSync(outDir)){
  fs.mkdirSync(outDir);
}

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
  remove: (fileName) => fs.unlinkSync(path.join(outDir, fileName)),
  mockCWD: (dir) => jest.spyOn(process, 'cwd').mockReturnValue(dir),
};
