export type TemplateDescription = {
  subject: string;
  templateName: string;
};

export class MailerTemplate {
  public static SEND_USER_PASSWORD: TemplateDescription = {
    subject: 'Your Password',
    templateName: 'SendUserPassword',
  };
}
