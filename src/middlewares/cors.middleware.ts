import { Express } from 'express';
import cors from 'cors';
import { env } from '../config/env.config';

export function setupCors(app: Express) {
  const origin =
    env.CORS_ORIGINS && env.CORS_ORIGINS !== '*'
      ? env.CORS_ORIGINS.split(',').map((o) => o.trim())
      : '*';
  app.use(cors({ origin }));
}
