import { Request, Response } from 'express';
import { matchedData } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import { IBook, TCreateBookBody } from './books.types';

// Example data
const books: IBook[] = [
  { id: '1', title: 'Book One', author: 'Author One' },
  { id: '2', title: 'Book Two', author: 'Author Two' },
];

export const createBook = (req: Request, res: Response) => {
  // Extract only validated/sanitized fields
  const { title, author, isbn } = matchedData<TCreateBookBody>(req);

  const newBook: IBook = {
    id: uuidv4(),
    title,
    author,
    isbn,
  };

  //   books.push(newBook);

  return res.status(201).json(newBook);
};

export const getBookById = (req: Request, res: Response) => {
  const { id } = matchedData<{ id: string }>(req);

  const book = books.find((b) => b.id === id);

  if (!book) {
    return res.status(404).send('Book not found');
  }

  res.json(book);
};

export const getAllBooks = (req: Request, res: Response) => {
  res.json(books);
};
