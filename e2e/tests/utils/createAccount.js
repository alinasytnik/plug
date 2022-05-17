const { faker } = require('@faker-js/faker');
const { EXTENSION_ID } = require('./bootstrap');

// eslint-disable-next-line import/prefer-default-export
const createAccount = async (page) => {
  const password = faker.internet.password();
  const mnemonic = 'song diagram rapid crazy bike ticket water sea world detail divide cup';

  const popupURL = `chrome-extension://${EXTENSION_ID}/popup.html`;

  await page.click('.puppeteer-create-wallet');

  await page.focus('.puppeteer-password');
  await page.keyboard.type(password);
  await page.focus('.puppeteer-password-confirm');
  await page.keyboard.type(password);
  await page.click('.puppeteer-password-button');

  await page.waitForSelector('.puppeteer-reveal-seed-phrase');
  await page.click('.puppeteer-reveal-seed-phrase');
  await page.click('.puppeteer-seed-phrase');
  await page.click('.puppeteer-seed-phrase-checkbox');
  await page.click('.puppeteer-seed-phrase-continue-btn');

  await page.goto(popupURL, { waitUntil: 'load' });

  await page.focus('.puppeteer-unlock-password');
  await page.keyboard.type(password);
  await page.click('#puppeteer-unlock-button');

  return { password, mnemonic };
};

module.exports = { createAccount };
