import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resourceService } from '../services/services.js';
import './ResourceForm.css';

export const AddResource = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Books',
    description: '',
    condition: 'Good',
    contactInfo: ''
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Books', 'Electronics', 'Furniture', 'Sports Equipment',
    'Stationery', 'Tools', 'Medical Equipment', 'Household Items',
    'Educational Materials', 'Other'
  ];

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('condition', formData.condition);
      data.append('contactInfo', formData.contactInfo);
      if (image) {
        data.append('image', image);
      }

      await resourceService.addResource(data);
      navigate('/seller-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Resource</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Resource Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g., Chemistry Textbook"
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Describe the resource in detail..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Condition *</label>
            <select name="condition" value={formData.condition} onChange={handleChange}>
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Contact Information *</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
              placeholder="Phone or email for contact"
            />
          </div>

          <div className="form-group">
            <label>Resource Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Resource'}
          </button>
        </form>
      </div>
    </div>
  );
};

export const EditResource = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = [
    'Books', 'Electronics', 'Furniture', 'Sports Equipment',
    'Stationery', 'Tools', 'Medical Equipment', 'Household Items',
    'Educational Materials', 'Other'
  ];

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'Poor'];

  useEffect(() => {
    fetchResource();
  }, [id]);

  const fetchResource = async () => {
    try {
      const response = await resourceService.getResourceById(id);
      setFormData(response.data);
      if (response.data.image) {
        setImagePreview(response.data.image);
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load resource');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('category', formData.category);
      data.append('description', formData.description);
      data.append('condition', formData.condition);
      data.append('contactInfo', formData.contactInfo);
      if (image) {
        data.append('image', image);
      }

      await resourceService.updateResource(id, data);
      navigate('/seller-dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update resource');
      setLoading(false);
    }
  };

  if (loading && !formData) {
    return <div className="loading">Loading...</div>;
  }

  if (!formData) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Edit Resource</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Resource Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <div className="form-group">
            <label>Condition *</label>
            <select name="condition" value={formData.condition} onChange={handleChange}>
              {conditions.map(cond => (
                <option key={cond} value={cond}>{cond}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Contact Information *</label>
            <input
              type="text"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Resource Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Resource'}
          </button>
        </form>
      </div>
    </div>
  );
};
