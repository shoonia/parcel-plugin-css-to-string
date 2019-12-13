const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('basic tests', () => {
  afterEach(() => {
    helper.emptyDir();
  });

  afterAll(() => {
    helper.rmDir();
  });

  it('should be style in string', async () => {
    await helper.createBundler(entry).bundle();

    const { received } = helper.require();

    expect(received).toBe('.test {\n  color: red;\n}\n');
  });
});
