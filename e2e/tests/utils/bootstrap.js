const puppeteer = require('puppeteer');

const EXTENSION_ID = 'loomjckegjmnkdgifjoblacbedcpbmii';

async function bootstrap(options = {}) {
  const { devtools = false } = options;

  const browser = await puppeteer.launch({
    slowMo: options.slowMo,
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

  const page = await browser.newPage();
  // Paste ID here if changed
  const optionsURL = `chrome-extension://${EXTENSION_ID}/options.html`;
  await page.goto(optionsURL, { waitUntil: 'load' });

  return {
    browser,
    optionsURL,
    page,
  };
}

module.exports = { bootstrap, EXTENSION_ID };
