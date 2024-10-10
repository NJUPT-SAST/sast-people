import 'server-only';
import { createTransport } from 'nodemailer';
import { mqClient } from './client';

const transporter = createTransport({
  host: 'smtp.feishu.cn',
  port: 465,
  secure: true,
  auth: {
    user: 'recruitment@sast.fun',
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = mqClient.createFunction(
  { id: 'step/send.email' },
  { event: 'step/send.email' },
  async ({ event, step }) => {
    await email(`${event.data.studentId}@njupt.edu.cn`);
    return { success: true };
  },
);

export const email = async (emailAddress: string) => {
  console.log(`Sending offer email to ${emailAddress}`);
  let mailOptions = {
    from: '"SAST R&D Center" <recruitment@sast.fun>',
    to: emailAddress,
    subject: `SAST 2024 招新结果`,
    text: 'test',
  };

  await transporter.sendMail(mailOptions);
};
