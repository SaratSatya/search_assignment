Complete this repository as a polished submission for the Zeerostock Search-Focused Assignment.

Must-have behavior:
- GET /search with q, category, minPrice, maxPrice
- q should be case-insensitive partial search on productName
- multiple filters can be combined
- no filters returns all results
- invalid numeric filters should return 400
- minPrice > maxPrice should return 400
- frontend should allow all filters, display results, handle no results, and show invalid price-range error
- keep the UI simple and clean
- use the existing static JSON data source
- update README with search logic explanation and one performance improvement for large datasets

Do not add a database, auth, or unnecessary architecture.
