import swaggerJsdoc from 'swagger-jsdoc';
import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { schemas } from './swagger.schemas';
import { API_PREFIX } from '../constants/api.constants';
import { env } from '../config/env.config';

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

const swaggerSpec = swaggerJsdoc({
  definition: swaggerDefinition,
  // Collect JSDoc from route files
  apis: ['./src/api/**/*.routes.ts'],
});

mkdirSync(path.join(process.cwd(), 'dist'), { recursive: true });
writeFileSync(path.join(process.cwd(), 'dist', 'swagger.json'), JSON.stringify(swaggerSpec, null, 2));

console.log('Wrote dist/swagger.json');
