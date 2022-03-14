const { bootstrap, EXTENSION_ID } = require('./bootstrap');

describe('Login/Signup/Logout from extension', () => {
  let context;

  beforeAll(async () => {
    const _context = await bootstrap();

    context = _context;
  });

  it('should import new wallet and unlock the extension', async () => {
    const phrase = 'song diagram rapid crazy bike ticket water sea world detail divide cup';
    const password = '111111111111';
    const { optionsPage, browser } = context;

    await optionsPage.click('#puppeteer-import-wallet');

    await optionsPage.focus('#puppeteer-secret-recovery-phrase');
    await optionsPage.keyboard.type(phrase);
    await optionsPage.click('#puppeteer-import-wallet-confirm');

    await optionsPage.focus('#puppeteer-password');
    await optionsPage.keyboard.type(password);

    await optionsPage.focus('#puppeteer-password-confirm');
    await optionsPage.keyboard.type(password);

    await optionsPage.click('#puppeteer-password-button');

    const popupPage = await browser.newPage();
    const popupURL = `chrome-extension://${EXTENSION_ID}/popup.html`;
    await popupPage.goto(popupURL, { waitUntil: 'load' });

    await popupPage.focus('.puppeteer-unlock-password');
    await popupPage.keyboard.type(password);
    await popupPage.click('#puppeteer-unlock-button');
  });
});
