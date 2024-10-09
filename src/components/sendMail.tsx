import Mail from "./mail";

const sendMail = async (emailAddress: string, emailOwnerName: string, emailOwnerId: string, flowName: string = 'SAST') => {
const nodemailer = require('nodemailer');

// 创建 SMTP 传输器
var transporter = nodemailer.createTransport({
  host: 'smtp.feishu.cn',
  port: 465, // 或者 465
  secure: false, // true 表示使用 SSL
});

// 发送邮件
var mailOptions = {
  from: '"Your Name " <your-email@example.com>', // 发件人地址
  to: emailAddress, // 收件人地址
  subject: `SAST2024招新`, // 邮件主题
  html: Mail({flowName : flowName, name : emailOwnerName, id : emailOwnerId}), // HTML 内容
};

transporter.sendMail(mailOptions, (error: any, info: { messageId: any; }) => {
  if (error) {
    return console.log(error);
  }
  console.log('邮件已发送: %s', info.messageId);
});
}
