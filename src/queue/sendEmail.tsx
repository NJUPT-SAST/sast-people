import 'server-only';
import { createTransport } from 'nodemailer';
import { mqClient } from './client';
import { render } from '@react-email/components';
import OfferEmail from '@/emails/offer';

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
    const { studentID, name, flowName, accept } = event.data;
    // return { studentId: event.data.studentId, name: event.data.name };
    await email(`${studentID}@njupt.edu.cn`, name, flowName, accept);
    return { success: true };
  },
);

export const email = async (
  emailAddress: string,
  name: string,
  flowName: string,
  accept: boolean,
) => {
  console.log(`Sending offer email to ${emailAddress}`);
  const email = await render(
    <OfferEmail name={name} flowName={flowName} accept={accept} />,
  );
  let mailOptions = {
    from: '"SAST R&D Center" <recruitment@sast.fun>',
    to: emailAddress,
    subject: `SAST 2024 招新结果`,
    html: email,
  };

  await transporter.sendMail(mailOptions);
};
