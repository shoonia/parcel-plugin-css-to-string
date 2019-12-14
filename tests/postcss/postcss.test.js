const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('postcss config', () => {
  it('should be used `.postcssrc.json` config file', async () => {
    const fileName = helper.randomName();
    const spy = helper.mockCWD(__dirname);
    await helper.bundle(entry, fileName);
    spy.mockRestore();
    const { received } = helper.require(fileName);
    helper.remove(fileName);

    expect(received).toBe('.test{color:#000}');
  });
});
