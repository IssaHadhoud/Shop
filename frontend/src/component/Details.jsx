import api from "../api"
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";
import toast, { Toaster } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

import { getCreateSessionId } from "./Product";
const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [product, setProduct] = useState("");

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
      console.log(user);
    } catch (err) {
      token.error(err);
    }
  }

  const getProduct = async () => {
    try {
      const res = await api.get(`/product/${id}`);
      setProduct(res.data.Product);
      console.log(res.data.Product);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const addToCart = async (productId) => {
    try {
      const sessionId = getCreateSessionId();
      const res = await api.post(`/cart/add`, {
        sessionId,
        productId,
        quantity: 1,
      });
      const data = res.data;
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await api.delete(`/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(res.data.message);
      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center mt-5">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Toaster />
      <div className="card shadow-lg border-0 rounded-4 p-4">
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <img
              src={product.imageURL}
              alt={product.name}
              className="img-fluid rounded"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>

          <div className="col-md-7">
            <h3 className="fw-bold">{product.name}</h3>

            <p className="text-muted">{product.description}</p>

            <h5 className="text-success">${product.price}</h5>

            <p>
              Category:
              <Link to={`/category/${product.category._id}`}>
                <span className="badge bg-primary">
                  {product.category.title}
                </span>
              </Link>
            </p>

            <div className="d-flex gap-3 mt-4">
              <button
                className="btn btn-outline-success"
                onClick={() => {
                  addToCart(product._id);
                }}
              >
                🛒
              </button>
              <button
                className="btn btn-dark ms-auto"
                onClick={() => navigate(-1)}
              >
                Back
              </button>

              {user?.type === "Admin" && (
                <>
                  <Link to={`/product/edit/${product._id}`}>
                    <button className="btn btn-success">Edit</button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
