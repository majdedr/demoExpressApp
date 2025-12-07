import express from 'express';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { errorHandler } from './middlewares/errorHandler.middleware';
import { setupCors } from './middlewares/cors.middleware';
import { setupHelmet } from './middlewares/helmet.middleware';
import { setupRateLimit } from './middlewares/rateLimit.middleware';
import routes from './api/routes';
import { setupSwagger } from './swagger/swagger.config';

export function createApp() {
  const app = express();

  // Security & Middleware
  setupHelmet(app);
  setupCors(app);
  setupRateLimit(app);
  app.use(express.json({ limit: '200kb' }));
  app.use(cookieParser());

  // Swagger
  setupSwagger(app);

  // Routes
  app.use('/api/v1', routes);

  // Error handler
  app.use(errorHandler);

  return app;
}
