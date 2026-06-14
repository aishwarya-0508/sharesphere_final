import { useEffect, useState } from "react";
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
    fetchResources();
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
    <div className="container">
      <div className="dashboard-header">
        <h1>Buyer Dashboard</h1>

        <button onClick={logout}>
          Logout
        </button>
      </div>

      <h3>
        Available Resources: {resources.length}
      </h3>

      <div className="resource-grid">
        {resources.length === 0 ? (
          <h2>No Resources Available</h2>
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

              {resource.sellerId && (
                <>
                  <p>
                    <strong>Seller:</strong>{" "}
                    {resource.sellerId.name}
                  </p>

                  <p>
                    <strong>Email:</strong>{" "}
                    {resource.sellerId.email}
                  </p>
                </>
              )}

              <button
                disabled={
                  resource.status !==
                    "Available" ||
                  requestingId ===
                    resource._id
                }
                onClick={() =>
                  handleRequest(
                    resource._id
                  )
                }
              >
                {requestingId ===
                resource._id
                  ? "Sending..."
                  : resource.status ===
                    "Available"
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