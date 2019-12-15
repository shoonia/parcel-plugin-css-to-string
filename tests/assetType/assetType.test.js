const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('custom assetType', () => {
  it('should be asserted custom extension', async () => {
    const fileName = helper.randomName();
    const spy = helper.mockCWD(__dirname);

    expect(process.cwd()).toBe(__dirname);
    await helper.bundle(entry, fileName);
    spy.mockRestore();
    const { cssx, mystyle } = helper.require(fileName);

    expect(cssx).toBe('.test0 {\n  color: red;\n}\n');
    expect(mystyle).toBe('.test1 {\n  color: red;\n}\n');
  });
});
