import "./App.css";
import Login from "./pages/Login";

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { TaskContextProvider } from "./context/TaskContext";
import { useEffect } from "react";
import { client } from "./supabase/client";
import { ROUTES } from "./utils/constants";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    client.auth.onAuthStateChange((session) => {
      if (session === "SIGNED_IN") {
        navigate(ROUTES.dashboard);
      }
      if (session === "SIGNED_OUT") {
        navigate(ROUTES.login);
      }
    });
  }, [navigate]);

  return (
    <div className="App">
      <TaskContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </div>
  );
}

export default App;
