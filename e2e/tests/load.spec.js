const { bootstrap } = require('./bootstrap');

describe('Login/Signup/Logout from extension', () => {
  let context;

  beforeAll(async () => {
    const _context = await bootstrap();

    context = _context;
  });

  it('should create new wallet', async () => {
    const phrase = 'song diagram rapid crazy bike ticket water sea world detail divide cup';
    const password = '111111111111';
    const { optionsPage } = context;

    await optionsPage.click('#puppeteer-import-wallet');

    await optionsPage.focus('#puppeteer-secret-recovery-phrase');
    await optionsPage.keyboard.type(phrase);
    await optionsPage.click('#puppeteer-import-wallet-confirm');

    await optionsPage.focus('#puppeteer-password');
    await optionsPage.keyboard.type(password);

    await optionsPage.focus('#puppeteer-password-confirm');
    await optionsPage.keyboard.type(password);

    await optionsPage.click('#puppeteer-password-button');
  });
});
