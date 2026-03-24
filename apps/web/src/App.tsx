import { useEffect, useMemo, useState } from "react";
import { fetchCategories, searchInventory } from "./api";
import type { InventoryItem } from "./types";
import "./styles.css";

type FormState = {
  q: string;
  category: string;
  minPrice: string;
  maxPrice: string;
};

const initialState: FormState = {
  q: "",
  category: "",
  minPrice: "",
  maxPrice: ""
};

export default function App() {
  const [form, setForm] = useState<FormState>(initialState);
  const [categories, setCategories] = useState<string[]>([]);
  const [results, setResults] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const priceRangeError = useMemo(() => {
    if (!form.minPrice || !form.maxPrice) return "";
    return Number(form.minPrice) > Number(form.maxPrice)
      ? "Minimum price cannot be greater than maximum price."
      : "";
  }, [form.minPrice, form.maxPrice]);

  useEffect(() => {
    void fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    void runSearch(initialState);
  }, []);

  async function runSearch(nextForm: FormState) {
    setLoading(true);
    setError("");

    try {
      const data = await searchInventory(nextForm);
      setResults(data.results);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (priceRangeError) {
      setError(priceRangeError);
      return;
    }

    await runSearch(form);
  }

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  return (
    <main className="page-shell">
      <section className="card">
        <div className="heading-row">
          <div>
            <p className="eyebrow">Zeerostock</p>
            <h1>Inventory Search</h1>
            <p className="subtle">Filter inventory by name, category, and price range.</p>
          </div>
        </div>

        <form className="filters-grid" onSubmit={handleSubmit}>
          <label>
            <span>Search product</span>
            <input
              value={form.q}
              onChange={(event) => updateField("q", event.target.value)}
              placeholder="Try wireless, chair, mug..."
            />
          </label>

          <label>
            <span>Category</span>
            <select
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Min price</span>
            <input
              type="number"
              value={form.minPrice}
              onChange={(event) => updateField("minPrice", event.target.value)}
              placeholder="0"
            />
          </label>

          <label>
            <span>Max price</span>
            <input
              type="number"
              value={form.maxPrice}
              onChange={(event) => updateField("maxPrice", event.target.value)}
              placeholder="5000"
            />
          </label>

          <div className="action-row">
            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setForm(initialState);
                void runSearch(initialState);
              }}
            >
              Reset
            </button>
          </div>
        </form>

        {priceRangeError ? <p className="inline-error">{priceRangeError}</p> : null}
        {error ? <p className="inline-error">{error}</p> : null}

        <section className="results-block">
          <div className="results-header">
            <h2>Results</h2>
            <span>{results.length} item(s)</span>
          </div>

          {loading ? (
            <p className="subtle">Loading results...</p>
          ) : results.length === 0 ? (
            <div className="empty-state">No results found.</div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Supplier</th>
                    <th>City</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => (
                    <tr key={item.id}>
                      <td>{item.productName}</td>
                      <td>{item.category}</td>
                      <td>₹{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.supplierName}</td>
                      <td>{item.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
