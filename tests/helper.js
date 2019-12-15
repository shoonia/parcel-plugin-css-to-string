const path = require('path');
const fs = require('fs');
const Bundler = require('parcel-bundler');
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

function requireAndRemove(fileName) {
  const filePath = path.join(outDir, fileName);
  const data = require(filePath);

  fs.unlinkSync(filePath);

  return data;
}

module.exports = {
  bundle,
  require: requireAndRemove,
  randomName: () => `index.${nanoid()}.js`,
  mockCWD: (dir) => jest.spyOn(process, 'cwd').mockReturnValue(dir),
};
