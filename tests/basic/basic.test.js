const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('basic tests', () => {
  it('should be style in string', async () => {
    const fileName = driver.randomName();

    await driver.bundle(entry, fileName);

    const { received } = driver.require(fileName);

    expect(received).toBe('.test {\n  color: red;\n}\n');
  });
});
