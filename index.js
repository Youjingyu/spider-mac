const request = require('request');
const cheerio = require('cheerio');
const log4js = require('log4js');
const nodemailer = require('nodemailer');

log4js.configure({
  appenders: {
    log: {
      type: 'file',
      filename: `./log/spider.log`
    }
  },
  categories: {
    default: {
      appenders: ['log'],
      level: 'info'
    }
  }
});
const logger = log4js.getLogger('log');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    auth: {
        user: '735284268@qq.com',
        pass: '***'
    }
});

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
        transporter.sendMail({
            from: '735284268@qq.com',
            to: '735284268@qq.com',
            subject: 'Message',
            text: 'mac has been there'
          }, (err, info) => {
            console.log(info.envelope);
            console.log(info.messageId);
          });
      }
    } else {
      logger.info(error);
      logger.info(response);
    }
  });
}