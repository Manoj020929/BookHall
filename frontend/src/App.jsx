import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import BookForm from "./pages/BookForm";
import BookReader from "./pages/BookReader";

function Protected({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function StaffOnly({ children }) {
  const { user, isStaff } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return isStaff ? children : <Navigate to="/" replace />;
}

function Navbar() {
  const { user, isStaff, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <Link to="/" className="brand">📚 BookHall</Link>
      <nav>
        {user ? (
          <>
            {isStaff && <Link to="/books/new" className="btn small">+ Add Book</Link>}
            <span className="muted">Hi, {user}</span>
            <button className="btn small ghost" onClick={() => { logout(); navigate("/login"); }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Protected><Books /></Protected>} />
          <Route path="/books/new" element={<StaffOnly><BookForm /></StaffOnly>} />
          <Route path="/books/:id/edit" element={<StaffOnly><BookForm /></StaffOnly>} />
          <Route path="/books/:id" element={<Protected><BookReader /></Protected>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}