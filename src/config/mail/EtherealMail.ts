import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export default class EtherealMail {
  static async sendMail({ to, body }: ISendMail): Promise<void> {
    //const account = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      auth: {
        user: 'teusolive@gmail.com',
        pass: '198022198022'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const message = await transporter.sendMail({
      from: 'teusolive@gmail.com',
      to,
      subject: 'Recuperação de senha',
      text: body
    })
  }
}
