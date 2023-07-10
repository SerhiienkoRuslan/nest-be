export const SECRET = process.env.SECRET || 'secret-key';

export const MAIL_CONFIG = {
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  user: process.env.SMTP_USERNAME,
  pass: process.env.SMTP_PASSWORD,
};

export const CLIENT_HOST = process.env.CLIENT_HOST || '';

export const CLIENT_PORT = process.env.CLIENT_PORT || '';
