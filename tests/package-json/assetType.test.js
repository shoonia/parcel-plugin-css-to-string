const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'script.js');

describe('package.json config', () => {
  it('should assert custom extension', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    await driver.bundle(entry, fileName);

    spy.mockRestore();

    const { cssx, mystyle } = driver.require(fileName);

    expect(cssx).toBe('.test_cssx {\n  color: red;\n}\n');
    expect(mystyle).toBe('.test_mystyle {\n  color: red;\n}\n');
  });
});
