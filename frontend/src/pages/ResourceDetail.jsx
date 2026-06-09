import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resourceService, requestService } from '../services/services.js';
import PlaceholderImage from '../components/PlaceholderImage.jsx';
import './ResourceDetail.css';

export const ResourceDetail = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await resourceService.getResourceById(id);
      setResource(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load resource');
      setLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await requestService.createRequest({
        resourceId: id,
        message
      });
      setRequestSuccess(true);
      setMessage('');
      setTimeout(() => {
        navigate('/buyer-dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit request');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">⏳ Loading resource details...</div>;
  }

  if (error && !resource) {
    return <div className="error-message">❌ {error}</div>;
  }

  return (
    <div className="resource-detail">
      <div className="back-button">
        <button onClick={() => navigate('/buyer-dashboard')}>← Back to Dashboard</button>
      </div>

      {resource && (
        <div className="detail-container">
          <div className="detail-image">
            {resource.image ? (
              <img src={resource.image} alt={resource.title} />
            ) : (
              <PlaceholderImage category={resource.category} height="400px" />
            )}
          </div>

          <div className="detail-content">
            <h1>📦 {resource.title}</h1>

            <div className="detail-info">
              <div className="info-item">
                <span className="label">📁 Category:</span>
                <span className="value">{resource.category}</span>
              </div>
              <div className="info-item">
                <span className="label">⭐ Condition:</span>
                <span className="value">{resource.condition}</span>
              </div>
              <div className="info-item">
                <span className="label">📊 Status:</span>
                <span className="value status">{resource.status}</span>
              </div>
              <div className="info-item">
                <span className="label">👤 Seller:</span>
                <span className="value">{resource.sellerId?.name}</span>
              </div>
              <div className="info-item">
                <span className="label">📞 Contact:</span>
                <span className="value">{resource.sellerId?.email} | {resource.sellerId?.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">Seller Contact:</span>
                <span className="value">{resource.contactInfo}</span>
              </div>
            </div>

            <div className="description">
              <h3>Description</h3>
              <p>{resource.description}</p>
            </div>

            {resource.status === 'Available' && (
              <div className="request-section">
                <h3>Request This Resource</h3>
                {error && <div className="error-message">{error}</div>}
                {requestSuccess && (
                  <div className="success-message">Request submitted successfully! Redirecting...</div>
                )}
                <form onSubmit={handleRequestSubmit}>
                  <div className="form-group">
                    <label>Add a message (optional)</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell the seller why you need this resource..."
                      rows="4"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              </div>
            )}

            {resource.status !== 'Available' && (
              <div className="unavailable-message">
                <p>This resource is currently not available for request.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
