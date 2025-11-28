import { useState, useContext } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AddHabit() {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState("daily");

  const { token } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE}/api/habits`, 
      { title, notes, frequency },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    nav("/");
  };

  return (
    <div className="center-box">
      <h2>Add Habit</h2>
      <form onSubmit={submit}>
        <input placeholder="Habit Title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <textarea placeholder="Notes" value={notes} onChange={(e)=>setNotes(e.target.value)} />
        <select value={frequency} onChange={(e)=>setFrequency(e.target.value)}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button>Add Habit</button>
      </form>
    </div>
  );
}
