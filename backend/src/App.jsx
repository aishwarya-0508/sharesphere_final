import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resourceService, requestService, analyticsService } from '../services/services.js';
import PlaceholderImage from '../components/PlaceholderImage.jsx';
import './Dashboard.css';

export const SellerDashboard = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const resRes = await resourceService.getSellerResources();
setResources(resRes.data);

try {
  const reqRes = await requestService.getSellerRequests();
  setRequests(reqRes.data);
} catch (err) {
  console.log("Requests API not available");
}

try {
  const analyticsRes = await analyticsService.getSellerAnalytics();
  setAnalytics(analyticsRes.data);
} catch (err) {
  console.log("Analytics API not available");
}
      setResources(resRes.data);
      console.log("Seller Resources:", resRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="loading">⏳ Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <h1>🏪 Seller Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveTab('resources')}
        >
          My Resources
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Requests
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview">
            <h2>Dashboard Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <h3>{resources.length}</h3>
                <p>Total Resources</p>
              </div>
              <div className="stat-card">
                <h3>{analytics?.availableResources || 0}</h3>
                <p>Available</p>
              </div>
              <div className="stat-card">
                <h3>{analytics?.approvedRequests || 0}</h3>
                <p>Approved Requests</p>
              </div>
              <div className="stat-card">
                <h3>{analytics?.pendingRequests || 0}</h3>
                <p>Pending Requests</p>
              </div>
              <div className="stat-card">
                <h3>{analytics?.sharedResources || 0}</h3>
                <p>Shared Resources</p>
              </div>
              <div className="stat-card">
                <h3>{analytics?.rejectedRequests || 0}</h3>
                <p>Rejected Requests</p>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/add-resource')}
            >
              Add New Resource
            </button>
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="resources-section">
            <h2>📦 My Resources</h2>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/add-resource')}
            >
              ➕ Add Resource
            </button>
            <div className="resources-list">
              {resources.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#999', padding: '40px 20px' }}>
                  📭 No resources added yet. Start sharing by clicking "Add Resource"!
                </p>
              ) : (
                resources.map((resource) => (
                  <div key={resource._id} className="resource-item">
                    <div className="resource-image-wrapper">
                      {resource.image ? (
                        <img src={resource.image} alt={resource.title} />
                      ) : (
                        <PlaceholderImage category={resource.category} />
                      )}
                    </div>
                    <div className="resource-info">
                      <h3>{resource.title}</h3>
                      <p><strong>📁 Category:</strong> {resource.category}</p>
                      <p><strong>📊 Status:</strong> <span className="status">{resource.status}</span></p>
                      <p><strong>⭐ Condition:</strong> {resource.condition}</p>
                      {resource.description && <p><strong>📝 Description:</strong> {resource.description}</p>}
                    </div>
                    <div className="resource-actions">
                      <button 
                        className="btn btn-edit"
                        onClick={() => navigate(`/edit-resource/${resource._id}`)}
                      >
                        ✏️ Edit
                      </button>
                      <button className="btn btn-delete">🗑️ Delete</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>Buyer Requests</h2>
            <div className="requests-list">
              {requests.length === 0 ? (
                <p>No requests received</p>
              ) : (
                requests.map((request) => (
                  <div key={request._id} className="request-item">
                    <div className="request-info">
                      <h3>{request.resourceId?.title}</h3>
                      <p>Buyer: {request.buyerId?.name} ({request.buyerId?.email})</p>
                      <p>Status: <span className="status">{request.status}</span></p>
                      {request.message && <p>Message: {request.message}</p>}
                    </div>
                    <div className="request-actions">
                      {request.status === 'Pending' && (
                        <>
                          <button className="btn btn-approve">Approve</button>
                          <button className="btn btn-reject">Reject</button>
                        </>
                      )}
                      {request.status === 'Approved' && (
                        <button className="btn btn-share">Mark Shared</button>
                      )}
                      {request.status === 'Shared' && (
                        <button className="btn btn-return">Confirm Return</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>Analytics</h2>
            {analytics && (
              <>
                <div className="analytics-cards">
                  <div className="card">
                    <h3>Total Requests: {analytics.totalRequests}</h3>
                  </div>
                  <div className="card">
                    <h3>Approved: {analytics.approvedRequests}</h3>
                  </div>
                  <div className="card">
                    <h3>Rejected: {analytics.rejectedRequests}</h3>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export const BuyerDashboard = () => {
  const [resources, setResources] = useState([]);
  const [requests, setRequests] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [activeTab, setActiveTab] = useState('browse');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [resRes, reqRes, analyticsRes] = await Promise.all([
        resourceService.getAllResources({}),
        requestService.getBuyerRequests(),
        analyticsService.getBuyerAnalytics()
      ]);
      setResources(resRes.data);
      setRequests(reqRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <nav className="dashboard-navbar">
        <h1>Buyer Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </nav>

      <div className="dashboard-tabs">
        <button 
          className={`tab ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          Browse Resources
        </button>
        <button 
          className={`tab ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          My Requests
        </button>
        <button 
          className={`tab ${activeTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setActiveTab('analytics')}
        >
          Analytics
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'browse' && (
          <div className="browse-section">
            <h2>Available Resources</h2>
            <div className="resources-grid">
              {resources.map((resource) => (
                <div key={resource._id} className="resource-card">
                  {resource.image && <img src={resource.image} alt={resource.title} />}
                  <h3>{resource.title}</h3>
                  <p>Category: {resource.category}</p>
                  <p>Condition: {resource.condition}</p>
                  <p>Status: <span className="status">{resource.status}</span></p>
                  <p>Seller: {resource.sellerId?.name}</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => navigate(`/resource/${resource._id}`)}
                  >
                    View & Request
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>My Requests</h2>
            <div className="requests-list">
              {requests.length === 0 ? (
                <p>No requests made yet</p>
              ) : (
                requests.map((request) => (
                  <div key={request._id} className="request-item">
                    <div className="request-info">
                      <h3>{request.resourceId?.title}</h3>
                      <p>Seller: {request.sellerId?.name}</p>
                      <p>Status: <span className="status">{request.status}</span></p>
                      <p>Requested: {new Date(request.requestDate).toLocaleDateString()}</p>
                    </div>
                    <div className="request-actions">
                      {request.status === 'Shared' && (
                        <button className="btn btn-return">Return Resource</button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="analytics-section">
            <h2>My Analytics</h2>
            {analytics && (
              <div className="analytics-cards">
                <div className="card">
                  <h3>Total Requests: {analytics.totalRequests}</h3>
                </div>
                <div className="card">
                  <h3>Approved: {analytics.approvedRequests}</h3>
                </div>
                <div className="card">
                  <h3>Rejected: {analytics.rejectedRequests}</h3>
                </div>
                <div className="card">
                  <h3>Borrowed: {analytics.sharedResources}</h3>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
