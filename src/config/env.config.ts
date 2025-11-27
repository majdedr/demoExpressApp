import { cleanEnv, str, port } from 'envalid';

export const env = cleanEnv(process.env, {
  ENV: str({ choices: ['local', 'production'], default: 'local' }),
  PORT: port({ default: 4000 }),
  // Make DB and CORS vars optional so tools (like swagger generation) don't fail when not set
  DB_HOST: str({ default: '' }),
  DB_PORT: port({ default: 0 }),
  DB_USER: str({ default: '' }),
  DB_PASSWORD: str({ default: '' }),
  DB_NAME: str({ default: '' }),
  DB_SCHEMA: str({ default: '' }),
  CORS_ORIGINS: str({ default: '' }),
});
