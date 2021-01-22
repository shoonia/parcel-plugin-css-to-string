const fs = require('fs');
const path = require('path');
const driver = require('../driver');

const entry = path.join(__dirname, 'main.js');

describe('enable the generation of CSS files', () => {
  it('should have a CSS and JS files', async () => {
    const fileName = driver.randomName();
    const spy = driver.mockCwd(__dirname);

    await driver.bundle(entry, fileName);

    spy.mockRestore();

    const cssFile = fileName.slice(0, -2).concat('css');
    const cssPath = path.join(driver.outDir, cssFile);

    expect(fs.existsSync(cssPath)).toBe(true);

    const { received } = driver.require(fileName);

    const css = await fs.promises.readFile(cssPath, 'utf8');

    expect(received).toBe('body {\n  color: red;\n}\n');
    expect(received).toBe(css);
  });
});
