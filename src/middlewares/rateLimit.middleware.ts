import { Express } from 'express';
import rateLimit from 'express-rate-limit';

export function setupRateLimit(app: Express) {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    })
  );
}
