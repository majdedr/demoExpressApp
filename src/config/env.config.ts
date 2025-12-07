import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  ENV: str({ choices: ['local', 'production'], default: 'local' }),
  PORT: port({ default: 4000 }),
  DB_HOST: str({ default: process.env.DB_HOST || '' }),
  DB_PORT: port({ default: Number(process.env.DB_PORT) || 0 }),
  DB_USER: str({ default: process.env.DB_USER || '' }),
  DB_PASSWORD: str({ default: process.env.DB_PASSWORD || '' }),
  DB_NAME: str({ default: process.env.DB_NAME || '' }),
  CORS_ORIGINS: str({ default: process.env.CORS_ORIGINS || '' }),
});
