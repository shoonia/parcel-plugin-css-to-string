const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('postcss plugin', () => {
  it('should import b.css to a.css', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    await driver.bundle(entry, fileName);

    spy.mockRestore();

    const { received } = driver.require(fileName);

    expect(received).toBe('.b {\n  text-align: center;\n}\n');
  });
});
