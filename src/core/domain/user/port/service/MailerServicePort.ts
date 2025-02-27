export interface MailerServicePort {
  loadTemplate(templateName: string, data?: any): Promise<string>;

  sendMail(args: { to: string[]; subject: string; html: string; text?: string }): Promise<void>;

  sendUserPassword(to: string, password: string): Promise<void>;
}
