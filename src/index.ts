import app from './app';
import { cleanEnv, str, port } from 'envalid';

const env = cleanEnv(process.env, {
  ENV: str({ choices: ['local', 'production'], default: 'local' }),
  PORT: port({ default: 4000 }),
});

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
