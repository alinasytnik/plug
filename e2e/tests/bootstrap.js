const puppeteer = require('puppeteer');

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
  const optionsURL = 'chrome-extension://loomjckegjmnkdgifjoblacbedcpbmii/options.html';
  await optionsPage.goto(optionsURL, { waitUntil: 'load' });

  return {
    browser,
    optionsURL,
    optionsPage,
  };
}

module.exports = { bootstrap };
