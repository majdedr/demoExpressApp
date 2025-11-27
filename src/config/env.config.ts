import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  ENV: str({ choices: ['local', 'production'], default: 'local' }),
  PORT: port({ default: 4000 }),
  DB_HOST: str(),
  DB_PORT: port(),
  DB_USER: str(),
  DB_PASSWORD: str(),
  DB_NAME: str(),
  DB_SCHEMA: str(),
  CORS_ORIGINS: str(),
});
