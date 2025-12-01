export const booksSwagger = {
  BookResponse: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        example: '123e4567-e89b-12d3-a456-426614174000',
      },
      title: { type: 'string', example: 'The Great Gatsby' },
      author: { type: 'string', example: 'F. Scott Fitzgerald' },
      isbn: { type: 'string', example: '978-0-7432-7356-5' },
    },
    required: ['id', 'title', 'author'],
  },
  BookInsert: {
    type: 'object',
    properties: {
      title: { type: 'string', example: 'The Great Gatsby' },
      author: { type: 'string', example: 'F. Scott Fitzgerald' },
      isbn: { type: 'string', example: '978-0-7432-7356-5' },
    },
    required: ['title', 'author'],
  },
};
