import sgMail, { MailDataRequired } from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.SENDGRID_API_KEY);
sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

interface SendConfig {
  to: string;
  subject: string;
  html: string;
  text: string;
}

interface TemplateMail {
  html: string;
  text: string;
}

interface SendEmailMethods {
  noReplay({ to, subject, html, text }: SendConfig): Promise<void>;
}

class SendEmail implements SendEmailMethods {
  private header: TemplateMail = {
    html: '<center><h2><strong>MyServer</strong></h2>',
    text: 'MyServer \n'
  };

  private footer: TemplateMail = {
    html: '<br /><strong>from MyServer</strong></center>',
    text: '\n\nfrom MyServer'
  };

  async noReplay({ to, subject, html, text }: SendConfig): Promise<void> {
    try {
      const msg: MailDataRequired = {
        to,
        from: 'MyServer <noreply@moderavaca.mh4sh.dev>',
        subject,
        text: `${this.header.text}${text}${this.footer.text}`,
        html: `${this.header.html}${html}${this.footer.html}`
      };

      await sgMail.send(msg);
    } catch (err) {
      console.log(err);
    }
  }
}

export default SendEmail;
