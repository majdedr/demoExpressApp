import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { v4 as uuidv4 } from "uuid";
import { IBook, TCreateBookBody } from "./books.types";

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
