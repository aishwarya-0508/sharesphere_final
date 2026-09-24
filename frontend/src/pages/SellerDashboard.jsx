import { startTransition, useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./SellerDashboard.css";

function SellerDashboard() {
  const [resources, setResources] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchResources = async () => {
  try {
      const [resourceResponse, requestResponse] = await Promise.all([
        API.get("/resources/seller"),
        API.get("/requests/seller"),
      ]);

      setResources(resourceResponse.data.resources || []);
      setRequestCount(requestResponse.data.requests?.length || 0);
  } catch (err) {
    console.log("API Error:", err);
    setResources([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    startTransition(() => {
      fetchResources();
    });
  }, []);

  const deleteResource = async (id) => {
    try {
      await API.delete(`/resources/${id}`);

      setResources(
        resources.filter((r) => r._id !== id)
      );

      alert("Resource Deleted Successfully");
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="container dashboard-shell seller-dashboard">

      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Seller Portal</p>
          <h1>Seller Dashboard</h1>
        </div>

        <div>
          <button
            className="request-button"
            onClick={() => navigate("/add-resource")}
          >
            Add Resource
          </button>

          <button
            className="secondary-button"
            onClick={logout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>

          <button
            className="secondary-button"
  onClick={() =>
    navigate("/seller-requests")
  }
>
  View Requests
</button>
        </div>
      </div>

<div className="dashboard-banner">
  <div className="banner-overlay">

    <div className="banner-content">
      <h2>Welcome Back Seller 👋</h2>

      <p>
        Manage your resources, track requests and help
        your community through resource sharing.
      </p>
    </div>

    <div className="stats-container">
      <div className="stat-card">
        <h3>{resources.length}</h3>
        <p>Total Resources</p>
      </div>

      <div className="stat-card">
        <h3>{requestCount}</h3>
        <p>Requests</p>
      </div>

      <div className="stat-card">
        <h3>{resources.filter((resource) => resource.status !== "Available").length}</h3>
        <p>Unavailable</p>
      </div>
    </div>

  </div>
</div>
      <div className="resource-grid">

        {resources.length === 0 ? (
          <h2>No Resources Found</h2>
        ) : (
          resources.map((resource) => (
            <div
              key={resource._id}
              className="card"
            >
              <h3>{resource.title}</h3>

              <p>{resource.description}</p>

              <p>
                <strong>Category:</strong>{" "}
                {resource.category}
              </p>

              <p>
                <strong>Location:</strong>{" "}
                {resource.location}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {resource.status}
              </p>

              <button
                onClick={() =>
                  navigate(
                    `/edit-resource/${resource._id}`
                  )
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteResource(resource._id)
                }
                style={{
                  marginLeft: "10px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}

      </div>
    </div>
  );
}

export default SellerDashboard;