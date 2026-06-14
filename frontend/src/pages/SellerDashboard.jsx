import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function SellerDashboard() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchResources = async () => {
  try {
    const res = await API.get("/resources/seller");

    console.log("Seller Resources:", res.data);

    setResources(res.data.resources || []);
  } catch (err) {
    console.log("API Error:", err);
    setResources([]);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchResources();
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
    <div className="container">

      <div className="dashboard-header">
        <h1>Seller Dashboard</h1>

        <div>
          <button
            onClick={() => navigate("/add-resource")}
          >
            Add Resource
          </button>

          <button
            onClick={logout}
            style={{ marginLeft: "10px" }}
          >
            Logout
          </button>

          <button
  onClick={() =>
    navigate("/seller-requests")
  }
>
  View Requests
</button>
        </div>
      </div>

      <h3>Total Resources: {resources.length}</h3>

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