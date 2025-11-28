import { Link } from "react-router-dom";

export default function HabitCard({ h }) {
  return (
    <Link to={`/habit/${h._id}`} style={{
      display: "block",
      padding: "20px",
      borderRadius: "15px",
      marginTop: "15px",
      backdropFilter: "blur(10px)",
      background: "rgba(255,255,255,0.07)",
      border: "1px solid rgba(255,255,255,0.12)"
    }}>
      <h3>{h.title}</h3>
      <p>{h.frequency.toUpperCase()}</p>
    </Link>
  );
}
