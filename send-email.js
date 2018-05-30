const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    secure: true,
    auth: {
        user: '735284268@qq.com',
        pass: '***'
    }
});

module.exports = function (msg){
    transporter.sendMail({
        from: '735284268@qq.com',
        to: '735284268@qq.com',
        subject: 'Message',
        text: msg
      }, (err, info) => {
        console.log(info.envelope);
        console.log(info.messageId);
      });
}