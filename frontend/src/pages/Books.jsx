import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import { useAuth } from "../AuthContext";

export default function Books() {
  const { isStaff } = useAuth();
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 9;

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/books/", { params: { search, category, page } });
      setBooks(data.results);
      setCount(data.count);
    } finally {
      setLoading(false);
    }
  }, [search, category, page]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  useEffect(() => {
    api.get("/categories/").then((r) => setCategories(r.data));
  }, [books.length]);

  const remove = async (book) => {
    if (!window.confirm(`Delete "${book.title}"?`)) return;
    await api.delete(`/books/${book.id}/`);
    load();
  };

  const totalPages = Math.max(1, Math.ceil(count / pageSize));

  return (
    <>
      <div className="toolbar">
        <input
          placeholder="Search by title, author or ISBN…"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
        />
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : books.length === 0 ? (
        <div className="card empty">
          <p>No books found.</p>
          {isStaff && <Link to="/books/new" className="btn small">Add your first book</Link>}
        </div>
      ) : (
        <div className="grid">
          {books.map((b) => (
            <article className="card book" key={b.id}>
              <h3><Link to={`/books/${b.id}`}>{b.title}</Link></h3>
              <p className="muted">by {b.author}{b.published_year ? ` · ${b.published_year}` : ""}</p>
              {b.category && <span className="tag">{b.category}</span>}
              <p className="desc">{b.description || "No description."}</p>
              <p className="meta">
                ISBN {b.isbn} ·{" "}
                <strong className={b.available_copies > 0 ? "ok" : "out"}>
                  {b.available_copies}/{b.total_copies} available
                </strong>
              </p>
              <div className="actions">
                <Link to={`/books/${b.id}`} className="btn small">Read</Link>
                {isStaff && <Link to={`/books/${b.id}/edit`} className="btn small ghost">Edit</Link>}
                {isStaff && <button className="btn small danger" onClick={() => remove(b)}>Delete</button>}
              </div>
            </article>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="pager">
          <button className="btn small ghost" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
          <span className="muted">Page {page} of {totalPages}</span>
          <button className="btn small ghost" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
        </div>
      )}
    </>
  );
}