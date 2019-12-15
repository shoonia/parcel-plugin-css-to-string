const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('production minify build', () => {
  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('should be minify style in string', async () => {
    const fileName = helper.randomName();
    await helper.bundle(entry, fileName);
    const { received } = helper.require(fileName);

    expect(received).toBe('.test{color:red}');
  });
});
