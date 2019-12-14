const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('cssnaon', () => {
  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('should be used `cssnano.config.js` file', async () => {
    const fileName = helper.randomName();
    const spy = helper.mockCWD(__dirname);
    await helper.bundle(entry, fileName);
    spy.mockRestore();
    const { received } = helper.require(fileName);
    helper.remove(fileName);

    expect(received).toBe('.x{color:#000}');
  });
});
