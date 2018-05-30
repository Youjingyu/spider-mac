const log4js = require('log4js');



module.exports = function(filename){
    log4js.configure({
        appenders: {
          log: {
            type: 'file',
            filename: `./log/${filename}.log`
          }
        },
        categories: {
          default: {
            appenders: ['log'],
            level: 'info'
          }
        }
    });

    return log4js.getLogger('log')
};