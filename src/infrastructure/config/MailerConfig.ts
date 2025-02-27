import { get } from 'env-var';

export class MailerConfig {
  public static readonly MAILER_HOST: string = get('MAILER_HOST').required().asString();

  public static readonly MAILER_PORT: number = get('MAILER_PORT').required().asPortNumber();

  public static readonly MAILER_SECURE_ENABLE: boolean = get('MAILER_SECURE_ENABLE').required().asBool();

  public static readonly MAILER_USERNAME: string = get('MAILER_USERNAME').required().asString();

  public static readonly MAILER_PASSWORD: string = get('MAILER_PASSWORD').required().asString();
}
