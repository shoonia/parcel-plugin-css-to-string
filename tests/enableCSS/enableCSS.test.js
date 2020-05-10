const fs = require('fs');
const path = require('path');
const helper = require('../helper');

const entry = path.join(__dirname, 'main.js');

describe('enable the generation of CSS files', () => {
  it('should have a CSS and JS files', async () => {
    const fileName = helper.randomName();
    const spy = helper.mockCWD(__dirname);

    expect(process.cwd()).toBe(__dirname);

    await helper.bundle(entry, fileName);
    spy.mockRestore();

    const cssFile = fileName.slice(0, -2).concat('css');
    const cssPath = path.join(helper.outDir, cssFile);

    expect(fs.existsSync(cssPath)).toBeTruthy();

    const { received } = helper.require(fileName);
    const css = await fs.promises.readFile(cssPath, 'utf8');

    expect(received).toBe('body {\n  color: red;\n}\n');
    expect(received).toBe(css);
  });
});
