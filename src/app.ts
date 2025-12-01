import express from 'express';
import cors from 'cors';
import { env } from './config/env.config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandler.middleware';
import routes from './api/routes';

const app = express();

// Middleware stack
app.use(helmet());
app.use(
  cors({
    origin: () => {
      // Always use env.CORS_ORIGINS, fallback to '*'
      if (!env.CORS_ORIGINS) return '*';
      if (env.CORS_ORIGINS === '*') return '*';
      return env.CORS_ORIGINS.split(',').map((o) => o.trim());
    },
  })
);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json({ limit: '200kb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1', routes);

// Error handling middleware
app.use(errorHandler);

export default app;
