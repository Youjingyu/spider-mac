const puppeteer = require('puppeteer');
const sendEmail = require('./send-email');
const logger = require('./log')('vutlr');
let page

(async () => {
  const browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto('https://my.vultr.com/deploy');
  
  validate(page)
})();

async function validate() {
    const block = await page.$('deploy_block');
    const input = block.getElementsByTagName('input')[0];
    
    res = input.className.indexOf('deployplansoldout') < 0;

    if (res) {
        logger.info('Asia node');
        sendEmail('Asia node')
    } else {
        logger.info('no Asia node, sorry');
        setTimeout(() => {
            validate(page)
        }, 60000)
    }
}