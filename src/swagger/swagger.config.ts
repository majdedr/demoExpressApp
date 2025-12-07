import swaggerJsdoc from 'swagger-jsdoc';
import { mkdirSync, writeFileSync, readFileSync, existsSync } from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import { schemas } from './swagger.schemas';
import { API_PREFIX } from '../constants/api.constants';
import { env } from '../config/env.config';

/**
 * Generates the Swagger spec object from route JSDoc and schemas
 */
export function generateSwaggerSpec() {
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: `Books API - ${env.ENV}`,
      version: '1.0.0',
    },
    servers: [{ url: API_PREFIX }],
    components: { schemas },
    tags: [{ name: 'Books', description: 'Book management' }],
  };

  return swaggerJsdoc({
    definition: swaggerDefinition,
    apis: ['./src/api/**/*.routes.ts'], // collect JSDoc from route files
  });
}

/**
 * Writes Swagger JSON to dist/swagger.json
 */
export function writeSwaggerSpecToFile() {
  const distDir = path.join(process.cwd(), 'dist');
  const swaggerPath = path.join(distDir, 'swagger.json');

  mkdirSync(distDir, { recursive: true });

  const swaggerSpec = generateSwaggerSpec();
  writeFileSync(swaggerPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');

  console.log(`Swagger JSON written to ${swaggerPath}`);
}

/**
 * Returns Swagger spec object
 */
export function getSwaggerSpec() {
  const swaggerPath = path.join(process.cwd(), 'dist', 'swagger.json');
  if (!existsSync(swaggerPath)) {
    console.warn('Swagger file not found. Generate it first with writeSwaggerSpecToFile()');
    return null;
  }

  try {
    const swaggerFile = JSON.parse(readFileSync(swaggerPath, 'utf8'));
    return swaggerFile;
  } catch (err) {
    console.error('Failed to read Swagger JSON:', err);
    return null;
  }
}

/**
 * Mounts Swagger UI on an Express app
 */
export function setupSwagger(app: Express) {
  const swaggerSpec = getSwaggerSpec();
  if (!swaggerSpec) return;

  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      swaggerOptions: {
        docExpansion: 'none',
        defaultModelsExpandDepth: -1,
      },
    })
  );

  console.log('Swagger UI available at /api-docs');
}
