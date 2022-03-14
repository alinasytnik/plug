const puppeteer = require('puppeteer');

const EXTENSION_ID = 'loomjckegjmnkdgifjoblacbedcpbmii';

async function bootstrap(options = {}) {
  const { devtools = false } = options;

  const browser = await puppeteer.launch({
    slowMo: 25,
    headless: false,
    devtools,
    args: [
      '--disable-extensions-except=../extension/chrome',
      '--load-extension=../extension/chrome',
      '--enable-automation',
    ],
  });

  // TODO: Find out how to get extension ID programmatically
  // const targets = browser.targets();

  // const extensionTarget = targets.find((target) => {
  //   console.log('TARGET TYPE', target);

  //   return target.type() === 'browser';
  // });
  // const partialExtensionUrl = extensionTarget._targetInfo.url || '';
  // const [, , extensionId] = partialExtensionUrl.split('/');

  const optionsPage = await browser.newPage();
  // Paste ID here if changed
  const optionsURL = `chrome-extension://${EXTENSION_ID}/options.html`;
  await optionsPage.goto(optionsURL, { waitUntil: 'load' });

  return {
    browser,
    optionsURL,
    optionsPage,
  };
}

module.exports = { bootstrap, EXTENSION_ID };
