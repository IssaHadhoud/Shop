import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);


  
  const createProduct = async () => {
    if (!name || !description || !price || !stock || !category || !image) {
  return toast.error("Please fill all fields");
}
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("image", image);
  
     


      await axios.post("http://localhost:5000/product", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");

      
      setName("");
      setDescription("");
      setImage(null);
      setPreview("");
      setCategory("");
      setPrice("");
      setStock("");

      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Create failed");
    }
  };


  const getCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/category");
      setCategories(res.data.category);
    } catch (err) {
      toast.error(err.response?.data?.message || "Category error");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mt-5">
      <Toaster />

      <div className="card shadow-lg p-4 rounded-4">

        <h3 className="text-center mb-4">Create Product</h3>

        
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
          className="form-control mb-3"
          value={name}
          placeholder="Product name"
          onChange={(e) => setName(e.target.value)}
        />

        
        <textarea
          className="form-control mb-3"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />

       
        <div className="row">
          <div className="col">
            <input
              type="number"
              className="form-control mb-3"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="col">
            <input
              type="number"
              className="form-control mb-3"
              value={stock}
              placeholder="Stock"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
        </div>

       
        <input
          type="file"
          className="form-control mb-3"
          onChange={(e) => {
            const file = e.target.files[0];
            setImage(file);
            setPreview(URL.createObjectURL(file));
          }}
        />

        <select
          className="form-select mb-3"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Choose category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>


        <div className="d-flex justify-content-center gap-2">

          <button className="btn btn-success" onClick={createProduct}>
            Create
          </button>
          
          <Link to="/dashboard">
            <button className="btn btn-dark">Back</button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CreateProduct;