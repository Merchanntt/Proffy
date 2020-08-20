import nodemailer, { Transporter } from 'nodemailer';
import TemplateMailProvider, { ParseData } from './TemplateMailProvider';

interface ContactInfo {
  name: string;
  email: string;
}

interface SendMailData {
  to: ContactInfo;
  from?: ContactInfo;
  subject: string;
  templateData: ParseData;
}

const templateMailProvider = new TemplateMailProvider();

export default class MailProvider {
  private client: Transporter | undefined;

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  async sendMail({
    to, subject, templateData, from,
  }: SendMailData): Promise<void> {
    const email = await this.client?.sendMail({
      from: {
        name: from?.name || 'Equipe Proffy',
        address: from?.email || 'equipe@proffy.com',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await templateMailProvider.parse(templateData),
    });

    console.log('Message sent: %s', email.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(email));
  }
}
