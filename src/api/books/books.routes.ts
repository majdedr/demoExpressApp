import { Router, Request, Response } from 'express';

const router = Router();

// Define a type for the Book object
interface Book {
	id: string;
	title: string;
	author: string;
}

// Example data (this would typically come from a database)
const books: Book[] = [
	{ id: '1', title: 'Book One', author: 'Author One' },
	{ id: '2', title: 'Book Two', author: 'Author Two' },
];

// Define your routes here
router.get('/', (req: Request, res: Response) => {
	res.json(books);
});

router.get('/:id', (req: Request, res: Response) => {
	const book = books.find((b) => b.id === req.params.id);
	if (book) {
		res.json(book);
	} else {
		res.status(404).send('Book not found');
	}
});

export default router;
