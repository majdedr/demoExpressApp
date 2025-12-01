// Define a type for the Book object
export interface IBook {
	id: string;
	title: string;
	author: string;
	isbn?: string;
}

export type TCreateBookBody = {
  title: string;
  author: string;
  isbn?: string;
};