import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddHabit from "./pages/AddHabit";
import HabitDetail from "./pages/HabitDetail";
import AuthProvider from "./context/AuthContext";
import Protected from "./Protected";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />

          <Route
            path="/add"
            element={
              <Protected>
                <AddHabit />
              </Protected>
            }
          />

          <Route
            path="/habit/:id"
            element={
              <Protected>
                <HabitDetail />
              </Protected>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
