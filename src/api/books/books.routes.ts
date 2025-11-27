import { Router, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Define a type for the Book object
interface Book {
	id: string;
	title: string;
	author: string;
	isbn?: string;
}

// Example data (this would typically come from a database)
const books: Book[] = [
	{ id: '1', title: 'Book One', author: 'Author One' },
	{ id: '2', title: 'Book Two', author: 'Author Two' },
];

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BookResponse'
 */
router.get('/', (req: Request, res: Response) => {
	res.json(books);
});

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInsert'
 *     responses:
 *       201:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 */
router.post('/', (req: Request, res: Response) => {
	const { title, author, isbn } = req.body;
	if (!title || !author) {
		return res.status(400).json({ message: 'title and author are required' });
	}
	const newBook: Book = { id: uuidv4(), title, author, isbn };
	books.push(newBook);
	return res.status(201).json(newBook);
});

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BookResponse'
 *       404:
 *         description: Book not found
 */
router.get('/:id', (req: Request, res: Response) => {
	const book = books.find((b) => b.id === req.params.id);
	if (book) {
		res.json(book);
	} else {
		res.status(404).send('Book not found');
	}
});

export default router;
