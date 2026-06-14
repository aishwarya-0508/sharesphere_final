import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import API from "../services/api";

function EditResource() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      category: "",
      location: "",
    });

  useEffect(() => {
    loadResource();
  }, []);

  const loadResource = async () => {
    const res = await API.get(
      `/resources/${id}`
    );

    setFormData(res.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.put(
      `/resources/${id}`,
      formData
    );

    alert("Updated");

    navigate("/seller-dashboard");
  };

  return (
    <div className="form-container">
      <h2>Edit Resource</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <input
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <button type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditResource;