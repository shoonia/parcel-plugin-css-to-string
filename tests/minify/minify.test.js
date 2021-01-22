const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('production minify build', () => {
  it('should minify css', async () => {
    const fileName = driver.randomName();

    process.env.NODE_ENV = 'production';

    await driver.bundle(entry, fileName);

    process.env.NODE_ENV = 'test';

    const { received } = driver.require(fileName);

    expect(received).toBe('.test{color:red}');
  });
});
