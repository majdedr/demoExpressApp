import { Express } from 'express';
import helmet from 'helmet';

export function setupHelmet(app: Express) {
  app.disable('x-powered-by');
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}
