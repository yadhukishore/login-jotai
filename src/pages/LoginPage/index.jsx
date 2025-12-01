import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "@src/api/config";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.post("/auth/login", { username, password });

      const data = res.data;

      // store token in localStorage if present
      if (data?.token) localStorage.setItem("token", data.token);
      if (data?.access_token) localStorage.setItem("token", data.access_token);

      setLoading(false);
      // Redirect to dashboard (adjust path if needed)
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh" }} className="flex items-center justify-center">
      <div style={{ width: 360 }} className="p-6 border rounded shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Sign in</h2>

        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-sm">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded"
              required
            />
          </label>

          <label className="block mb-4">
            <span className="text-sm">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full border px-3 py-2 rounded"
              required
            />
          </label>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
