import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddResource() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    condition: "",
    location: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/resources", formData);

      alert("Resource Added Successfully");
      navigate("/seller-dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to add resource");
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>Add New Resource</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Resource Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Books">Books</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Sports">Sports</option>
            <option value="Others">Others</option>
          </select>

          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Good">Good</option>
            <option value="Used">Used</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (Optional)"
            value={formData.image}
            onChange={handleChange}
          />

          <button type="submit" className="btn-primary">
            Add Resource
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddResource;