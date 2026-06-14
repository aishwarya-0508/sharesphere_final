import { useEffect, useState } from "react";
import API from "../services/api";

function SellerRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
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
  };

  return (
    <div className="container">
      <h1>Resource Requests</h1>

      {requests.length === 0 ? (
        <h2>No Requests Yet</h2>
      ) : (
        requests.map((request) => (
          <div
            key={request._id}
            className="card"
          >
            <h3>
              {
                request.resourceId
                  ?.title
              }
            </h3>

            <p>
              Buyer:
              {" "}
              {
                request.buyerId
                  ?.name
              }
            </p>

            <p>
              Email:
              {" "}
              {
                request.buyerId
                  ?.email
              }
            </p>

            <p>
              Status:
              {" "}
              {request.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default SellerRequests;