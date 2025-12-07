# demoExpressApp

A TypeScript Express API with Swagger/OpenAPI 3.0 documentation.

## Features
- Express 4.x API (TypeScript)  
- Swagger UI at `/api-docs`  
- Modular route and schema structure  
- Environment variable validation with `envalid`  
- Automatic Swagger JSON generation in development  
- Rate limiting, Helmet security, CORS configuration, cookie parsing  

## Project Structure

src/  
  api/  
    books/  
      books.routes.ts      # Book routes (with Swagger JSDoc)  
      books.swagger.ts     # Book schemas for OpenAPI  
    routes.ts              # Main API router (mounts Swagger UI)  
  config/  
    env.config.ts          # Environment config (envalid)  
  constants/  
    api.constants.ts       # API prefix  
  middlewares/  
    errorHandler.middleware.ts  
  swagger/  
    swagger.config.ts      # Generates dist/swagger.json  
    swagger.schemas.ts     # Aggregates feature schemas  
app.ts                     # Express app setup  
index.ts                   # App entrypoint  

## Setup

1. Install dependencies:  
yarn install  

2. Set environment variables. Create a `.env` file in the project root (example `.env.example` is provided):  

ENV=local  
PORT=4000  
DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=mysecretpassword  
DB_NAME=books  
CORS_ORIGINS=*  

`.env` is ignored by Git to protect sensitive data.  

3. Start the server (development)  

If automatic Swagger generation is integrated:  
yarn dev  

Or using a combined dev script:  
yarn dev:all  

The server will watch your files and restart automatically on changes. Swagger JSON will regenerate on route/schema changes.  

## API Docs

Swagger UI: http://localhost:4000/api-docs  
Docs are generated from JSDoc comments in your route files (e.g., `src/api/books/books.routes.ts`).  

## Environment Variables

All variables are optional for local development (defaults are applied):  

- ENV — `local` or `production` (default: `local`)  
- PORT — server port (default: `4000`)  
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_SCHEMA  
- CORS_ORIGINS — comma-separated list of allowed origins  

## Scripts

- `yarn swagger` — Generate Swagger JSON from JSDoc  
- `yarn dev` — Start the app with TypeScript and automatic Swagger generation  
- `yarn dev:all` — Regenerate Swagger then start server (if implemented)  
- `yarn build` — Compile TypeScript to `dist/`  
- `yarn start` — Run compiled app from `dist/`  

## Adding More APIs

1. Add new feature routes in `src/api/<feature>/<feature>.routes.ts`  
2. Add schemas in `src/api/<feature>/<feature>.swagger.ts` and export them in `src/swagger/swagger.schemas.ts`  
3. Document endpoints using `@openapi` JSDoc blocks in route files  

Example JSDoc block for a route:  

/**
 * @openapi
 * /books:
 *   get:
 *     summary: Get all books
 *     tags:
 *       - Books
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

## Security Notes

- Helmet is used for security headers.  
- Rate limiting prevents abuse.  
- CORS is configured via environment variables.  
- Cookie parsing enabled for future auth use.  

For production, consider storing sensitive data in environment variables or a secrets manager (AWS Secrets Manager, Azure Key Vault, etc.).  

## License

MIT — add a license field to your package.json.
