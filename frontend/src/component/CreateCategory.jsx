import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateCategory = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  const create = async () => {
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);

      await axios.post("http://localhost:5000/category", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success("Category created");

      setTitle("");
      setDescription("");
      setImage(null);
      setPreview("");

      navigate("/category");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div className="container mt-5">
      <Toaster />

      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4 rounded-4">

            <h3 className="text-center mb-4">Create Category</h3>

            <div className="text-center mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              ) : (
                <p className="text-muted">No image selected</p>
              )}
            </div>

            <input
              type="text"
              className="form-control mb-3"
              value={title}
              placeholder="Enter category title"
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="form-control mb-3"
              rows="3"
              value={description}
              placeholder="Enter category description"
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
            <div className="d-flex justify-content-center align-items-center gap-2">
            <button className="btn btn-success " onClick={create}>
              Create
            </button>
            <button className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;