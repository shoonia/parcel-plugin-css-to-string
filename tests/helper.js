const path = require('path');
const Bundler = require('parcel-bundler');
const { nanoid } = require('nanoid/non-secure');

const outDir = path.join(__dirname, './__dist__');

jest.setTimeout(15000);

const bundle = (entry, outFile) => {
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
};

module.exports = {
  bundle,
  outDir,
  require: (name) => require(path.join(outDir, name)),
  randomName: () => `${nanoid()}.js`,
  mockCWD: (dir) => jest.spyOn(process, 'cwd').mockReturnValue(dir),
};
