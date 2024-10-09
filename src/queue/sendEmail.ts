import 'server-only';
import { Queue } from 'quirrel/next';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.feishu.cn',
  port: 465,
  secure: true,
  auth: {
    user: 'recruitment@sast.fun',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default Queue('api/sendOfferEmail', async (emailAddress: string) => {
  await transporter
    .sendMail({
      from: '"SAST R&D Center" <recruitment@sast.fun>',
      to: emailAddress,
      subject: `SAST 2024 招新结果`,
      text: 'test',
    })
    .then((res) => {
      console.log(res);
    });
});

export const sendEmailTest = async (emailAddress: string) => {
  console.log(`Sending offer email to ${emailAddress}`);
  let mailOptions = {
    from: '"SAST R&D Center" <recruitment@sast.fun>',
    to: emailAddress,
    subject: `SAST 2024 招新结果`,
    text: 'test',
  };

  await transporter.sendMail(mailOptions);
};
