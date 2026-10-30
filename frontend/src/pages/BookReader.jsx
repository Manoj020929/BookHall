import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function BookReader() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/books/${id}/`)
      .then((r) => setBook(r.data))
      .catch(() => setError("Could not load this book."));
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!book) return <p className="muted">Loading…</p>;

  const pages = book.pages || [];
  const page = pages[index];

  return (
    <div className="reader">
      <Link to="/" className="muted">← Back to books</Link>
      <h2>{book.title}</h2>
      <p className="muted">by {book.author}</p>

      {pages.length === 0 ? (
        <div className="card"><p>No pages have been added to this book yet.</p></div>
      ) : (
        <>
          <article className="card page">
            {page.title && <h3>{page.title}</h3>}
            <div className="page-text">{page.content}</div>
          </article>
          <div className="pager">
            <button className="btn small ghost" disabled={index === 0} onClick={() => setIndex(index - 1)}>← Previous</button>
            <span className="muted">Page {index + 1} of {pages.length}</span>
            <button className="btn small ghost" disabled={index >= pages.length - 1} onClick={() => setIndex(index + 1)}>Next →</button>
          </div>
        </>
      )}
    </div>
  );
}