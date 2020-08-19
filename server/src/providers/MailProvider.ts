import nodemailer, { Transporter } from 'nodemailer';

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

  async sendMail(to: string, body: string): Promise<void> {
    const email = await this.client?.sendMail({
      from: 'Equipe Proffy <equipe@proffy.com>',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log('Message sent: %s', email.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(email));
  }
}
