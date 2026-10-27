import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
      navigate("/");
    } catch {
      setError("Invalid username or password.");
    }
  };

  return (
    <form className="card auth" onSubmit={submit}>
      <h2>Welcome back</h2>
      {error && <p className="error">{error}</p>}
      <label>Username
        <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required />
      </label>
      <label>Password
        <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
      </label>
      <button className="btn">Login</button>
      <p className="muted">New here? <Link to="/register">Create an account</Link></p>
    </form>
  );
}