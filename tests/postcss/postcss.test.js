const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('postcss config', () => {
  it('should use `.postcssrc.json` config file', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    await driver.bundle(entry, fileName);

    spy.mockRestore();

    const { received } = driver.require(fileName);

    expect(received).toBe('.test{color:#000}');
  });
});
