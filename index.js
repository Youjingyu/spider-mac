const request = require('request');
const cheerio = require('cheerio');
const sendEmail = require('./send-email');
const logger = require('./log')('spider');



spider();

function spider() {
  request('https://www.apple.com/cn/shop/browse/home/specialdeals/mac', function (error, response, body) {
    if (!error && response && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const hashMacAir = $('.section.list_content').find('li').eq(3).find('a').length > 0;
      if (!hashMacAir) {
        setTimeout(spider, 1000 * 60 * 1);
        logger.info('no mac air, sorry');
      } else {
        sendEmail('mac has been there')
      }
    } else {
      logger.info(error);
      logger.info(response);
    }
  });
}