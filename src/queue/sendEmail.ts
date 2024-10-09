import { Queue } from 'quirrel/next';

export default Queue('api/sendOfferEmail', async (emailAddress: string) => {
    console.log(`Sending offer email to ${emailAddress}`);
    // Send the email here
});
