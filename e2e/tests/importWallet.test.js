const { bootstrap, EXTENSION_ID } = require('./utils/bootstrap');
const { createAccount } = require('./utils/createAccount');

describe('Import wallet', () => {
  let context;
  let password;
  let mnemonic;

  beforeAll(async () => {
    const _context = await bootstrap();

    const user = await createAccount(_context.page);
    password = user.password;
    mnemonic = user.mnemonic;
    context = _context;
  });

  it('should import new wallet and unlock the extension', async () => {
    const { page, optionsURL } = context;

    expect(password).not.toBe(undefined);
    expect(mnemonic).not.toBe(undefined);

    const popupURL = `chrome-extension://${EXTENSION_ID}/popup.html`;

    await page.waitForSelector('.puppeteer-header-icon-btn');
    await page.click('.puppeteer-header-icon-btn');
    await page.click('.puppeteer-lock-btn');

    await page.goto(optionsURL, { waitUntil: 'load' });

    await page.reload();

    await page.click('.puppeteer-import-wallet');

    await page.focus('#puppeteer-secret-recovery-phrase');
    await page.keyboard.type(mnemonic);

    await page.click('#puppeteer-import-wallet-confirm');

    await page.focus('.puppeteer-password');
    await page.keyboard.type(password);

    await page.focus('.puppeteer-password-confirm');
    await page.keyboard.type(password);

    await page.click('.puppeteer-password-button');

    await page.goto(popupURL, { waitUntil: 'load' });

    await page.focus('.puppeteer-unlock-password');
    await page.keyboard.type(password);
    await page.click('#puppeteer-unlock-button');

    await context.page.evaluate(async () => {
      console.log('IC: ', window.ic);
    });
  });
});
