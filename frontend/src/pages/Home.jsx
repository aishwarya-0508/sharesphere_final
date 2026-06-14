import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="hero-section">
      <h1>ShareSphere</h1>

      <p>
        Smart Community Resource Sharing Platform
      </p>

      <div className="home-buttons">
        <Link to="/seller-login">
          <button>Seller Login</button>
        </Link>

        <Link to="/buyer-login">
          <button>Buyer Login</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
