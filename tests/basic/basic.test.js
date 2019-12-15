const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('basic tests', () => {
  it('should be style in string', async () => {
    const fileName = helper.randomName();
    await helper.bundle(entry, fileName);
    const { received } = helper.require(fileName);

    expect(received).toBe('.test {\n  color: red;\n}\n');
  });
});
