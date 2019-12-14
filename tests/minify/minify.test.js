const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('production minify build', () => {
  afterAll(() => {
    process.env.NODE_ENV = 'test';
    helper.rmDir();
  });

  afterEach(() => {
    helper.emptyDir();
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('should be minify style in string', async () => {
    await helper.bundle(entry);

    const { received } = helper.require();

    expect(received).toBe('.test{color:red}');
  });
});
