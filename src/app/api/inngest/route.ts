import { serve } from 'inngest/next';
import { mqClient } from '@/queue/client';
import { sendEmail } from '@/queue/sendEmail';
import queueFunctions from '@/queue';

export const { GET, POST, PUT } = serve({
  client: mqClient,
  functions: queueFunctions,
});
