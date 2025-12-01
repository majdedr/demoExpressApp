import { Router } from 'express';

import { createBookValidator, getBookByIdValidator } from './books.validators';
import { validate } from '../../middlewares/validate';
import { createBook, getAllBooks, getBookById } from './books.service';

export const booksRoutes = Router();

/**
 * GET /books
 */
booksRoutes.get('/', getAllBooks);

/**
 * POST /books
 */
booksRoutes.post('/', createBookValidator, validate, createBook);

/**
 * GET /books/:id
 */
booksRoutes.get('/:id', getBookByIdValidator, validate, getBookById);
