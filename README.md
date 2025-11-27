# demoExpressApp

A TypeScript Express API with Swagger/OpenAPI 3.0 documentation.

## Features
- Express 4.x API (TypeScript)
- Swagger UI at `/api/v1/api-docs`
- Modular route and schema structure
- Environment variable validation with `envalid`

## Project Structure
```
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
```

## Setup
1. **Install dependencies:**
   ```sh
   yarn install
   ```
2. **Generate Swagger JSON:**
   ```sh
   yarn swagger
   ```
   This creates `dist/swagger.json` from JSDoc in your route files.
3. **Start the server (dev):**
   ```sh
   yarn dev
   ```
   This runs the app with TypeScript using `tsx`.

## API Docs
- Visit: [http://localhost:4000/api/v1/api-docs](http://localhost:4000/api/v1/api-docs)
- Docs are generated from JSDoc comments in your route files (see `src/api/books/books.routes.ts`).

## Environment Variables
Set these in your environment or a `.env` file (all are optional for local/dev):
- `ENV` (default: `local`)
- `PORT` (default: `4000`)
- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SCHEMA`, `CORS_ORIGINS` (all default to empty/0)

## Scripts
- `yarn swagger` — Generate Swagger JSON from JSDoc
- `yarn dev` — Generate Swagger JSON and run the app with TypeScript
- `yarn build` — Compile TypeScript to `dist/`
- `yarn start` — Run compiled app from `dist/`

## Adding More APIs
- Add new feature routes in `src/api/<feature>/<feature>.routes.ts`
- Add schemas in `src/api/<feature>/<feature>.swagger.ts` and export from `src/swagger/swagger.schemas.ts`
- Document endpoints with JSDoc using the `@swagger` block

## License
MIT (add a license field to your package.json)
