import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { matchedData } from 'express-validator';

import { createBookValidator, getBookByIdValidator } from './books.validators';
import { IBook, TCreateBookBody } from './books.types';
import { validate } from '../../middlewares/validate';
import { createBook, getAllBooks, getBookById } from './books.service';

export const booksRoutes = Router();

// Example data
const books: IBook[] = [
  { id: '1', title: 'Book One', author: 'Author One' },
  { id: '2', title: 'Book Two', author: 'Author Two' },
];

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
