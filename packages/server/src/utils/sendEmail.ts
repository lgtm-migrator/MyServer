import sgMail, { MailDataRequired } from '@sendgrid/mail';

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

class SendEmail {
  private header: TemplateMail = {
    html: '<center><h2><strong>MyServer</strong></h2>',
    text: 'MyServer \n'
  };

  private footer: TemplateMail = {
    html: '<br /><strong>from MyServer</strong></center>',
    text: '\n\nfrom MyServer'
  };

  async noReplay({ to, subject, html, text }: SendConfig): Promise<void> {
    const msg: MailDataRequired = {
      to,
      from: 'MyServer <noreply@myserver.mh4sh.dev>',
      subject,
      text: `${this.header.text}${text}${this.footer.text}`,
      html: `${this.header.html}${html}${this.footer.html}`
    };

    await sgMail.send(msg);
  }
}

export default SendEmail;
