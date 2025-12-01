import { Router } from 'express';
import {booksRoutes} from './books/books.routes';
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';
import path from 'path';

const router = Router();

router.use('/books', booksRoutes);

// Serve swagger from generated dist/swagger.json
try {
	const swaggerFile = JSON.parse(readFileSync(path.join(process.cwd(), 'dist', 'swagger.json'), 'utf8'));
	router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
} catch (e) {
	// swagger.json may not exist yet (run `yarn swagger` to generate it)
	// silently skip serving docs until generated
}

export default router;
