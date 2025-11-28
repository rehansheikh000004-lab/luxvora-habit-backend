import { useState, useContext } from "react";
import axios from "axios";
import { API_BASE } from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err,setErr] = useState("");
  const nav = useNavigate();
  const { login } = useContext(AuthContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/api/auth/signup`, { username, email, password });
      login(res.data.user, res.data.token);
      nav("/");
    } catch (error) {
      setErr(error.response?.data?.message || "Error");
    }
  };

  return (
    <div className="center-box">
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <input placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        <button>Signup</button>
        <p className="error">{err}</p>
      </form>
      <p style={{marginTop:10}}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
