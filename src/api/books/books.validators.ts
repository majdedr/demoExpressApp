// books.validators.ts
import { body, param } from 'express-validator';

export const createBookValidator = [
  body('title').trim().notEmpty().withMessage('Title is required'),

  body('author').trim().notEmpty().withMessage('Author is required'),

  body('isbn').optional().isString().withMessage('ISBN must be a string'),
];

export const getBookByIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('Book ID is required')
    .isString()
    .withMessage('Book ID must be a string'),
];
