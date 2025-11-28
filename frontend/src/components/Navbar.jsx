import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav style={{ padding: 15, display: "flex", justifyContent: "space-between" }}>
      <Link to="/" style={{ color: "#00c3ff", fontWeight: "bold" }}>
        LuxVora Habit
      </Link>

      {user ? (
        <button onClick={logout} style={{ background: "transparent", color: "white" }}>
          Logout
        </button>
      ) : (
        <div>
          <Link to="/login" style={{ color: "#ddd", marginRight: 15 }}>Login</Link>
          <Link to="/signup" style={{ color: "#ddd" }}>Signup</Link>
        </div>
      )}
    </nav>
  );
}
