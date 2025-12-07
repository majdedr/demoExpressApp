import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  ENV: str({ choices: ['local', 'production'], default: 'local' }),
  NODE_ENV: str({ choices: ['development', 'production', 'test'], default: 'development' }),
  PORT: port({ default: 4000 }),
  DB_HOST: str({ default: '' }),
  DB_PORT: port({ default: 0 }),
  DB_USER: str({ default: '' }),
  DB_PASSWORD: str({ default: '' }),
  DB_NAME: str({ default: '' }),
  DB_SCHEMA: str({ default: '' }),
  CORS_ORIGINS: str({ default: '' }),
});
