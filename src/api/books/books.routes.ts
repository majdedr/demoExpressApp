import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { matchedData } from "express-validator";

import { createBookValidator, getBookByIdValidator } from "./books.validators";
import { IBook, TCreateBookBody } from "./books.types";
import { validate } from "../../middlewares/validate";

export const booksRoutes = Router();

// Example data
const books: IBook[] = [
  { id: "1", title: "Book One", author: "Author One" },
  { id: "2", title: "Book Two", author: "Author Two" },
];

/**
 * GET /books
 */
booksRoutes.get("/", (req: Request, res: Response) => {
  res.json(books);
});

/**
 * POST /books
 */
booksRoutes.post(
  "/",
  createBookValidator,
  validate,
  (req: Request, res: Response) => {
    // Extract the validated + sanitized data
    const { title, author, isbn } = matchedData<TCreateBookBody>(req);

    const newBook: IBook = {
      id: uuidv4(),
      title,
      author,
      isbn,
    };

    books.push(newBook);

    return res.status(201).json(newBook);
  }
);

/**
 * GET /books/:id
 */
booksRoutes.get(
  "/:id",
  getBookByIdValidator,
  validate,
  (req: Request, res: Response) => {
    const { id } = matchedData<{ id: string }>(req);

    const book = books.find((b) => b.id === id);

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.json(book);
  }
);
