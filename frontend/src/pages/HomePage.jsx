import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">ShareSphere</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/seller-login">Seller Login</Link>
          <Link to="/buyer-login">Buyer Login</Link>
          <Link to="/register-seller">Seller Register</Link>
          <Link to="/register-buyer">Buyer Register</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <div className="hero-content">

            <h1>Smart Community Resource Sharing Platform</h1>

            <p>
              Share books, electronics, furniture, tools and many more
              resources with your community while promoting sustainability
              and collaboration.
            </p>

            <div className="hero-buttons">
              <Link
                to="/register-seller"
                className="btn primary"
              >
                Become a Seller
              </Link>

              <Link
                to="/register-buyer"
                className="btn secondary"
              >
                Join as Buyer
              </Link>
            </div>

            <div className="login-section">
              <p>Already have an account?</p>

              <div className="login-buttons">
                <Link
                  to="/seller-login"
                  className="btn login-btn"
                >
                  Seller Login
                </Link>

                <Link
                  to="/buyer-login"
                  className="btn login-btn"
                >
                  Buyer Login
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">

        <h2>Why Choose ShareSphere?</h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>📦 Resource Sharing</h3>
            <p>
              Share unused resources with people who need them.
            </p>
          </div>

          <div className="feature-card">
            <h3>📍 Location Based Search</h3>
            <p>
              Find resources available near your location.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Authentication</h3>
            <p>
              JWT based authentication for secure access.
            </p>
          </div>

          <div className="feature-card">
            <h3>📊 Analytics Dashboard</h3>
            <p>
              Monitor requests, approvals and sharing activity.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔔 Notifications</h3>
            <p>
              Get instant updates for requests and approvals.
            </p>
          </div>

          <div className="feature-card">
            <h3>🤝 Community Building</h3>
            <p>
              Strengthen your local community through sharing.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="stats">

        <div className="stat-box">
          <h2>500+</h2>
          <p>Resources Shared</p>
        </div>

        <div className="stat-box">
          <h2>250+</h2>
          <p>Active Members</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Communities</p>
        </div>

        <div className="stat-box">
          <h2>1000+</h2>
          <p>Successful Requests</p>
        </div>

      </section>

      {/* About */}
      <section className="about">

        <h2>About ShareSphere</h2>

        <p>
          ShareSphere is a smart community resource sharing platform
          designed to connect people who have resources with those who
          need them. The platform encourages sustainable resource
          utilization, reduces waste and helps communities grow stronger
          through collaboration.
        </p>

      </section>

      {/* CTA */}
      <section className="cta">

        <h2>Start Sharing Today</h2>

        <p>
          Join thousands of users building a smarter community.
        </p>

        

      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          © 2026 ShareSphere | Smart Community Resource Sharing Platform
        </p>
      </footer>

    </div>
  );
}

export default HomePage;