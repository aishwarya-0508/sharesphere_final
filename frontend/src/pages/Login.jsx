import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";

function Login({ role }) {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      if (res.data.user.role.toLowerCase() !== role.toLowerCase()) {
        setError(`This account is registered as a ${res.data.user.role}. Use the ${res.data.user.role.toLowerCase()} login.`);
        return;
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

     const userRole = res.data.user.role.toLowerCase();

if (userRole === "seller") {
  navigate("/seller-dashboard");
} else {
  navigate("/buyer-dashboard");
}

    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="login-brand">ShareSphere</div>
        <p className="eyebrow">{role} Portal</p>
        <h1>Welcome back</h1>
        <p className="login-subtitle">
          Sign in to manage your community resource sharing account.
        </p>

        {error && <div className="inline-error">{error}</div>}

        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login-email">Email address</label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button className="login-submit" type="submit" disabled={loading}>
            {loading ? "Signing in..." : `Sign in as ${role}`}
          </button>
        </form>

        <p className="login-footer">
          Need an account? <Link to={role === "Seller" ? "/register-seller" : "/register-buyer"}>Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default Login;