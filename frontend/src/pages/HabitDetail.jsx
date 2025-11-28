import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { AuthContext } from "../context/AuthContext";

export default function HabitDetail() {
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const [habit, setHabit] = useState(null);
  const [checkins, setCheckins] = useState([]);

  const load = async () => {
    const habits = await axios.get(`${API_BASE}/api/habits`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setHabit(habits.data.find(h => h._id === id));

    const chk = await axios.get(`${API_BASE}/api/habits/${id}/checkins`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCheckins(chk.data);
  };

  const checkin = async () => {
    await axios.post(`${API_BASE}/api/habits/${id}/checkin`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    load();
  };

  useEffect(() => { load(); }, []);

  if (!habit) return <p>Loading...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>{habit.title}</h2>
      <p>{habit.notes}</p>

      <button onClick={checkin} style={{ marginTop: 10 }}>
        ✔ Check-in
      </button>

      <h3 style={{ marginTop: 30 }}>History</h3>
      {checkins.map(c => (
        <p key={c._id}>{new Date(c.date).toLocaleString()}</p>
      ))}
    </div>
  );
}
