import { createApp } from './app';
import { env } from './config/env.config';

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});