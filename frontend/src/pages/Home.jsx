import { Link } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      {/* Navigation */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            🌐 ShareSphere
          </Link>
          <ul className="nav-menu">
            <li><Link to="#features">Features</Link></li>
            <li><Link to="#how-it-works">How It Works</Link></li>
            <li><Link to="#contact">Contact</Link></li>
            <li><Link to="/login-seller" className="btn-seller">Seller Login</Link></li>
            <li><Link to="/login-buyer" className="btn-buyer">Buyer Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Share Resources, Build Community</h1>
          <p>Smart Community Resource Sharing Platform - Connect, Share, Thrive Together</p>
          <div className="cta-buttons">
            <Link to="/register-seller" className="btn btn-primary">✨ Start as Seller</Link>
            <Link to="/register-buyer" className="btn btn-secondary">🔍 Start as Buyer</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2>Why Choose ShareSphere?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Easy Resource Sharing</h3>
            <p>List your resources with beautiful photos and connect with community members who need them. Simple, fast, and intuitive.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Smart Search & Filter</h3>
            <p>Find exactly what you need with our powerful search, filtering by category, condition, and status. Smart discovery.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Verified</h3>
            <p>JWT authentication keeps your account safe and secure at all times. Your privacy is our priority.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics & Insights</h3>
            <p>Track your resource sharing with detailed analytics, charts, trends, and comprehensive reports.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Photo Management</h3>
            <p>Upload high-quality images of your resources to attract potential requesters and showcase condition.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Access ShareSphere on any device with our fully responsive and mobile-optimized interface.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Register as a Seller or Buyer and create your profile</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Create/Browse</h3>
            <p>Add resources or search for what you need in your community</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Request/Approve</h3>
            <p>Send requests or review and approve buyer requests</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Share & Return</h3>
            <p>Share resources and track their status throughout the lifecycle</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get in Touch</h2>
        <p>Have questions? We'd love to hear from you!</p>
        <p>📧 Email: info@sharesphere.com | ☎️ Phone: +1 (800) 123-4567</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 ShareSphere. All rights reserved. | Building communities one resource at a time</p>
      </footer>
    </div>
  );
};
