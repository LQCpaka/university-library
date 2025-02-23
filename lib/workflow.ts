import { Client as WorkflowClient } from '@upstash/workflow'
import { Client as QtashClient, resend } from "@upstash/qstash";
import config from '@/lib/config'

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.uptash.qtashUrl,
    token: config.env.uptash.qtashToken,
});

const qtashClient = new QtashClient({ token: config.env.uptash.qtashToken });

export const sendEmail = async ({ email, subject, message } : {email: string; subject: string; message: string;}) => {
    await qtashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({ token: config.env.uptash.qtashToken }),
        },
        body: {
            from: "LQC <hello.quyoccanlibrary.shop>",
            to: [email],
            subject,
            html: message,
        },
    });
}
