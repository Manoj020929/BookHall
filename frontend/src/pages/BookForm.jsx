import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const empty = {
  title: "", author: "", isbn: "", category: "", description: "",
  published_year: "", total_copies: 1, available_copies: 1,
};

export default function BookForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      api.get(`/books/${id}/`).then((r) =>
        setForm({ ...r.data, published_year: r.data.published_year ?? "" })
      );
    }
  }, [id]);

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      ...form,
      published_year: form.published_year === "" ? null : Number(form.published_year),
      total_copies: Number(form.total_copies),
      available_copies: Number(form.available_copies),
    };
    try {
      if (id) await api.put(`/books/${id}/`, payload);
      else await api.post("/books/", payload);
      navigate("/");
    } catch (err) {
      setErrors(err.response?.data || { detail: "Something went wrong." });
    }
  };

  const field = (name, label, props = {}) => (
    <label>{label}
      <input value={form[name]} onChange={set(name)} {...props} />
      {errors[name] && <span className="error">{[].concat(errors[name]).join(" ")}</span>}
    </label>
  );

  return (
    <form className="card form" onSubmit={submit}>
      <h2>{id ? "Edit book" : "Add a book"}</h2>
      {errors.detail && <p className="error">{errors.detail}</p>}
      {field("title", "Title", { required: true })}
      {field("author", "Author", { required: true })}
      {field("isbn", "ISBN", { required: true })}
      {field("category", "Category")}
      {field("published_year", "Published year", { type: "number", min: 0 })}
      <div className="row">
        {field("total_copies", "Total copies", { type: "number", min: 0 })}
        {field("available_copies", "Available copies", { type: "number", min: 0 })}
      </div>
      <label>Description
        <textarea rows={4} value={form.description} onChange={set("description")} />
      </label>
      <div className="actions">
        <button className="btn">{id ? "Save changes" : "Add book"}</button>
        <button type="button" className="btn ghost" onClick={() => navigate("/")}>Cancel</button>
      </div>
    </form>
  );
}