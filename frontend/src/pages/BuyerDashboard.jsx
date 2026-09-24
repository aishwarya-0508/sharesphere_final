import { startTransition, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function BuyerDashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requestingId, setRequestingId] = useState(null);

  const navigate = useNavigate();

const fetchResources = async () => {
  try {
    const res = await API.get("/resources");

    console.log("Resources:", res.data);

    setResources(res.data.resources || []);
  } catch (error) {
    console.log("Fetch Error:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    startTransition(() => {
      fetchResources();
    });
  }, []);

  const handleRequest = async (resourceId) => {
    try {
      setRequestingId(resourceId);

      const res = await API.post(
        `/requests/${resourceId}`
      );

      alert(
        res.data.message ||
          "Resource Request Sent Successfully"
      );

      fetchResources();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Request Failed"
      );
    } finally {
      setRequestingId(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <div className="container dashboard-shell">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Buyer Portal</p>
          <h1>Buyer Dashboard</h1>
        </div>

        <button className="secondary-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <span>Available Resources</span>
          <strong>{resources.length}</strong>
        </div>
      </div>

      <div className="resource-grid">
        {resources.length === 0 ? (
          <div className="empty-state">
            <h2>No Resources Available</h2>
            <p>New items from sellers will appear here.</p>
          </div>
        ) : (
          resources.map((resource) => (
            <div
              key={resource._id}
              className="card resource-card"
            >
              <div className="resource-topline">
                <span className="status-pill status-pill--available">
                  {resource.status || "Available"}
                </span>
                <span className="resource-category">
                  {resource.category}
                </span>
              </div>

              <h3>{resource.title}</h3>
              <p className="resource-description">
                {resource.description}
              </p>

              <div className="resource-meta">
                <p>
                  <strong>Location:</strong> {resource.location || "Not specified"}
                </p>
              </div>

              {resource.sellerId && (
                <div className="seller-meta">
                  <p>
                    <strong>Seller:</strong> {resource.sellerId.name}
                  </p>

                  <p>
                    <strong>Email:</strong> {resource.sellerId.email}
                  </p>
                </div>
              )}

              <button
                className="request-button"
                disabled={
                  resource.status !== "Available" ||
                  requestingId === resource._id
                }
                onClick={() => handleRequest(resource._id)}
              >
                {requestingId === resource._id
                  ? "Sending..."
                  : resource.status === "Available"
                  ? "Request Resource"
                  : "Not Available"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;