import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import Handlebars from 'handlebars';
import { MailerConfig } from '@infrastructure/config/MailerConfig';
import { ApiServerConfig } from '@infrastructure/config/ApiServerConfig';
import { MailerTemplate } from '@infrastructure/persistence/nodemailer/template/MailerTemplate';
import { MailerServicePort } from '@core/domain/user/port/service/MailerServicePort';
import { Exception } from '@core/common/exception/Exception';
import { Code } from '@core/common/code/Code';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NodemailerService implements MailerServicePort {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: MailerConfig.MAILER_HOST,
      port: MailerConfig.MAILER_PORT,
      secure: MailerConfig.MAILER_SECURE_ENABLE,
      auth: {
        user: MailerConfig.MAILER_USERNAME,
        pass: MailerConfig.MAILER_PASSWORD,
      },
    });
  }

  public async loadTemplate(templateName: string, data?: any): Promise<string> {
    const templatePath = path.join(process.cwd(), 'assets', 'mail-template', templateName + '.html');
    if (!fs.existsSync(templatePath)) {
      throw Exception.new({ code: Code.TEMPLATE_FILE_NOT_FOUND });
    }
    const content = fs.readFileSync(templatePath, 'utf-8');
    return Handlebars.compile(content)(data);
  }

  public async sendMail(payload: { to: string[]; subject: string; html: string; text?: string }): Promise<void> {
    await this.transporter.sendMail({
      from: `"${ApiServerConfig.SERVER_NAME}" <${MailerConfig.MAILER_USERNAME}>`,
      to: payload.to.join(', '),
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });
  }

  public async sendUserPassword(to: string, password: string): Promise<void> {
    const html = await this.loadTemplate(MailerTemplate.SEND_USER_PASSWORD.templateName, { password });

    await this.sendMail({
      subject: MailerTemplate.SEND_USER_PASSWORD.subject,
      to: [to],
      html,
    });
  }
}
