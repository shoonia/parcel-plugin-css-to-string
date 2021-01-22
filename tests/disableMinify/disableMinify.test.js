const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('disable minify', () => {
  it('should disable the minification of css', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    process.env.NODE_ENV = 'production';

    await driver.bundle(entry, fileName);

    process.env.NODE_ENV = 'test';
    spy.mockRestore();

    const { received } = driver.require(fileName);

    expect(received).toBe('.test {\n  color: red;\n}\n');
  });
});
