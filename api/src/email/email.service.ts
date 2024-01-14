import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(subject: string, message: string, to: string) {
    const user = this.configService.get<string>('SMTP_USER');

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user,
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });

    const mailOptions = {
      from: `"Salon Kleopatra" <${user}>`,
      to,
      subject,
      html: message,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}
