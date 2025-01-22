import { Client as WorkflowClient } from '@upstash/workflow';
import config from '@/lib/config';
import { Client as QStashClient, resend } from '@upstash/qstash';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.uptash.qstashUrl,
  token: config.env.uptash.qstashToken,
});

const qstashClient = new QStashClient({ token: config.env.uptash.qstashToken });

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: 'email',
      provider: resend({ token: config.env.resendToken }),
    },
    body: {
      from: 'Rayhan <mail.bookwise-library.my.id>',
      to: [email],
      subject,
      html: message,
    },
  });
};
