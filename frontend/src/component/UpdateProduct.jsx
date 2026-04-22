import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import api from "../api";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [categories, setCategories] = useState([]);


  const getProduct = async () => {
    try {
      const res = await api.get(`/product/${id}`);
      const data = res.data.Product;

      setName(data.name);
      setDescription(data.description);
      setPrice(data.price);
      setStock(data.stock);
      setCategory(data.category._id || data.category);
      setPreview(data.imageURL);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error loading product");
    }
  };


  const getCategories = async () => {
    try {
      const res = await api.get(`/category`);
      setCategories(res.data.category);
    } catch (err) {
      toast.error(err.response?.data?.message || "Category error");
    }
  };

  


  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name || !description || !price || !stock || !category || !image) {
  return toast.error("Please fill all fields");
}

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await api.put(
        `/product/${id}`,
        formData,
      );

      toast.success("Product updated successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };



  const handleDelete = async () => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/product/${id}`);

      toast.success("Product deleted");
      navigate("/");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, [id]);

  return (
    <div className="container mt-5">
      <Toaster />

      <div className="card shadow p-4 rounded-4">

        <h3 className="text-center mb-4">Edit Product</h3>

        <form onSubmit={handleUpdate}>

     

          <div className="mb-3 text-center">
            {preview && (
              <img
                src={preview}
                alt="preview"
                style={{ height: "180px", objectFit: "cover" }}
                className="rounded mb-2"
              />
            )}

            <input
              type="file"
              className="form-control"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <input
            className="form-control mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />

          <textarea
            className="form-control mb-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />

          <div className="row">
            <div className="col">
              <input
                className="form-control mb-3"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>

            <div className="col">
              <input
                className="form-control mb-3"
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="Stock"
              />
            </div>
          </div>



          <select
            className="form-control mb-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.title}
              </option>
            ))}
          </select>


          <div className="d-flex gap-2">
            <button className="btn btn-primary w-100">Update</button>
            <button
              type="button"
              className="btn btn-danger w-100"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;