import { Router } from 'express';
import booksRoutes from './books/books.routes';

const router = Router();

router.use('/books', booksRoutes);

export default router;
