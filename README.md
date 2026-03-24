# Zeerostock Search Assignment Starter

Starter repository for the **Search-Focused Assignment** from the provided PDF.

This repo is intentionally scaffolded for an AI coding agent to finish quickly.

## What this repo already gives you

- Monorepo with separate `api` and `web` apps
- Seed inventory dataset
- TypeScript setup for both apps
- API route scaffolding
- Frontend UI scaffolding
- Clear TODO markers
- Agent guidance files that describe the exact acceptance criteria

## Assignment scope in this repo

Build a simple inventory search feature with:

- `GET /search`
- Query params: `q`, `category`, `minPrice`, `maxPrice`
- Case-insensitive partial product-name search
- Multiple filters can be combined
- No filters returns all results
- Frontend search input, category dropdown, price range inputs, results list/table, and no-results state
- Edge cases: empty search, invalid price range, no matches

## Suggested runtime shape

- API on `http://localhost:4000`
- Web on `http://localhost:5173`

## Scripts

From the repo root:

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`

