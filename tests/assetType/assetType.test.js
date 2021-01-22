const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('custom assetType', () => {
  it('should assert the custom extensions', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    await driver.bundle(entry, fileName);

    spy.mockRestore();

    const { cssx, mystyle } = driver.require(fileName);

    expect(cssx).toBe('.test0 {\n  color: red;\n}\n');
    expect(mystyle).toBe('.test1 {\n  color: red;\n}\n');
  });
});
