const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'script.js');

describe('disable minify', () => {
  afterAll(() => {
    process.env.NODE_ENV = 'test';
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'production';
  });

  it('should be disable minify styles', async () => {
    const fileName = helper.randomName();
    const spy = helper.mockCWD(__dirname);

    expect(process.cwd()).toBe(__dirname);
    await helper.bundle(entry, fileName);
    spy.mockRestore();

    const { received } = helper.require(fileName);

    expect(received).toBe('.test {\n  color: red;\n}\n');
  });
});
