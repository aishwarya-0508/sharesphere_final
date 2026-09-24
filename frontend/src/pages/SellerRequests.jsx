import { startTransition, useEffect, useState } from "react";
import API from "../services/api";

function SellerRequests() {
  const [requests, setRequests] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [error, setError] = useState("");

  async function fetchRequests() {
    try {
      const res = await API.get(
        "/requests/seller"
      );

      setRequests(
        res.data.requests || []
      );
    } catch (error) {
      console.log(error);
    }
  }

  const updateStatus = async (requestId, status) => {
    try {
      setUpdatingId(requestId);
      setError("");

      await API.patch(`/requests/${requestId}/status`, { status });
      await fetchRequests();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to update this request"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    startTransition(() => {
      fetchRequests();
    });
  }, []);

  return (
    <div className="container dashboard-shell">
      <div className="dashboard-header">
        <div>
          <p className="eyebrow">Seller Requests</p>
          <h1>Resource Requests</h1>
        </div>
      </div>

      {error && <div className="inline-error">{error}</div>}

      {requests.length === 0 ? (
        <div className="empty-state">
          <h2>No Requests Yet</h2>
          <p>Buyer requests will appear here once they are sent.</p>
        </div>
      ) : (
        <div className="resource-grid">
          {requests.map((request) => (
            <div
              key={request._id}
              className="card resource-card"
            >
              <div className="resource-topline">
                <span className={`status-pill status-pill--${request.status.toLowerCase()}`}>
                  {request.status}
                </span>
              </div>

              <h3>{request.resourceId?.title || "Resource"}</h3>

              <div className="seller-meta">
                <p>
                  <strong>Buyer:</strong> {request.buyerId?.name || "Unknown buyer"}
                </p>

                <p>
                  <strong>Email:</strong> {request.buyerId?.email || "No email available"}
                </p>
              </div>

              {request.status === "Pending" && (
                <div className="request-actions">
                  <button
                    className="approve-button"
                    disabled={updatingId === request._id}
                    onClick={() => updateStatus(request._id, "Approved")}
                  >
                    {updatingId === request._id ? "Updating..." : "Accept Request"}
                  </button>
                  <button
                    className="decline-button"
                    disabled={updatingId === request._id}
                    onClick={() => updateStatus(request._id, "Rejected")}
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerRequests;