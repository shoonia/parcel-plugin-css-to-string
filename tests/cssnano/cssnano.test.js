const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('cssnaon config', () => {
  it('should use `cssnano.config.js` file', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    process.env.NODE_ENV = 'production';

    await driver.bundle(entry, fileName);

    process.env.NODE_ENV = 'test';

    spy.mockRestore();

    const { received } = driver.require(fileName);

    expect(received).toBe('.x{color:#000}');
  });
});
