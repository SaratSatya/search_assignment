# Agent Instructions

You are completing the **Search-Focused Assignment**.

## Goal

Finish this repository so it satisfies the assignment exactly, with clean code and minimal overengineering.

## Functional requirements

### Backend
Implement `GET /search`.

Supported query params:
- `q`: product name partial match
- `category`
- `minPrice`
- `maxPrice`

Rules:
- product-name search must be case-insensitive
- partial matches should work
- multiple filters can be combined
- no filters should return all results
- invalid numbers should return `400`
- `minPrice > maxPrice` should return `400`

Data source:
- static JSON file in this repo

### Frontend
Implement a simple UI with:
- search input box
- category dropdown
- min/max price inputs
- results table or list
- loading state
- "No results found" state
- inline validation for invalid price range

## Non-functional goals

- keep the implementation simple
- avoid adding databases or auth
- use existing folder structure
- keep styling minimal but clean
- do not rename the endpoint

## Deliverables expected in repo

- working API
- working frontend wired to API
- short README update with:
  - search logic explanation
  - one performance improvement for large datasets

## Priority order

1. Make backend correct
2. Wire frontend to backend
3. Handle edge cases cleanly
4. Polish README

