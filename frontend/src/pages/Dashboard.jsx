import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import HabitCard from "../components/HabitCard";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);
  const { token } = useContext(AuthContext);

  const load = async () => {
    const res = await axios.get(`${API_BASE}/api/habits`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHabits(res.data);
  };

  useEffect(() => { load(); }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Habits</h2>

      <Link to="/add">
        <button style={{ marginTop: 20 }}>+ Add Habit</button>
      </Link>

      <div style={{ marginTop: 20 }}>
        {habits.map(h => (
          <HabitCard key={h._id} h={h} />
        ))}
      </div>
    </div>
  );
}
