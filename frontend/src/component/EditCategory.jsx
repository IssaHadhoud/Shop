import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const token = localStorage.getItem("token");

  
  const getCategory = async () => {
    try {
      const res = await api.get(`/category`);
      const data = res.data.category.find((c) => c._id === id);

      setTitle(data.title);
      setDescription(data.description);
      setImage(data.imageURL);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading category");
    }
  };

 
  const handelUpdate = async (e) => {
    e.preventDefault();
 
    if (!title || !description || !image) {
  return toast.error("Please fill all fields");
}
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      if (image instanceof File) {
        formData.append("image", image);
      }

      await api.put(
        `/category/${id}`,
        formData);

      toast.success("Category updated");
      navigate("/category");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const deleteCategory = async () => {
    try {
      await api.delete(`/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Deleted successfully");
      navigate("/category");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  useEffect(() => {
    getCategory();
  }, [id]);

  return (
    <div className="container mt-5">
      <Toaster />

      <div className="card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4">Edit Category</h3>

        <form onSubmit={handelUpdate}>
          <input
            className="form-control mb-3"
            type="text"
            value={title}
            placeholder="Category title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

        
          <div className="text-center mb-3">
            {image && typeof image === "string" ? (
              <img
                src={image}
                alt="category"
                className="img-fluid rounded"
                style={{ maxHeight: "200px" }}
              />
            ) : (
              <p className="text-muted">No image selected</p>
            )}
          </div>

          <div className="d-flex gap-2">
            <button className="btn btn-primary w-100" type="submit">
              Update
            </button>

            <button
              type="button"
              onClick={deleteCategory}
              className="btn btn-danger w-100"
            >
              Delete
            </button>
            <button className="btn btn-dark" onClick={()=>navigate(-1)}>back</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;