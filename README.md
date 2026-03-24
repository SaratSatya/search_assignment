# Zeerostock Search Assignment

This monorepo contains a simple inventory search app with:

- `apps/api`: Express + TypeScript API
- `apps/web`: React + Vite frontend

## Run locally

From the repo root:

- `npm install`
- `npm run dev`
- API runs on `http://localhost:4000`
- Web runs on `http://localhost:5173`

## Search logic (`GET /search`)

Endpoint: `GET /search`

Supported query params:

- `q`: case-insensitive partial match on `productName`
- `category`: category filter (matched case-insensitively)
- `minPrice`: minimum item price
- `maxPrice`: maximum item price

Behavior implemented:

- Filters are fully composable (any combination works together)
- No filters returns all inventory items from the static JSON dataset
- Invalid numeric values for `minPrice` / `maxPrice` return `400`
- `minPrice > maxPrice` returns `400`

## Frontend behavior

The UI includes:

- Product search input
- Category dropdown
- Min/max price inputs
- Results table
- Loading state while the request is in-flight
- “No results found” empty state
- Inline validation when min price is greater than max price

## One practical performance improvement (for large datasets)

For larger inventories, a practical next step is to precompute a normalized search field (for example lowercased `productName` and `category`) and cache the parsed dataset in memory at startup, so each request avoids repeated normalization work and per-request parsing overhead.

## Scripts

From the repo root:

- `npm run dev`
- `npm run test`
- `npm run build`
