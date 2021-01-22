const { resolve } = require('path');
const Bundler = require('parcel-bundler');
const { nanoid } = require('nanoid/non-secure');

const outDir = resolve(__dirname, '__dist__');

jest.setTimeout(15000);

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

const bundle = (entry, outFile) => {
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
  require: (name) => require(resolve(outDir, name)),
  randomName: () => `${nanoid()}.js`,
  mockCwd: (root) => jest.spyOn(process, 'cwd').mockReturnValue(root),
};
