import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMemo } from "react";
import createApi from '../api'

export const getCreateSessionId = () => {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const [search, setSearch] = useState("");
  const getProduct = async () => {
    try {
      const res = await createApi.get(`/product`);
      console.log(res.data.product);
      setProduct(res.data.product);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    const fetchProducts = async () => {
      let url = `/product`;

      if (id) {
        url =`product/category/${id}`;
      }

      const res = await createApi.get(url);

      const data = id ? res.data.products : res.data.product;

      setProduct(data);
      console.log(data)
    };

    fetchProducts();
  }, [id]);

  const filteredProduct = useMemo(() => {
    let result = product;

    if (search) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return result;
  }, [search, product]);
  const addToCart = async (productId) => {
    try {
      const sessionId = getCreateSessionId();
      const res = await createApi.post(`/cart/add`, {
        sessionId,
        productId,
        quantity: 1,
      });
      toast.success(
        `"${product.find((x) => x._id == productId)?.name}" added to cart `,
      );
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div>
      <Navbar onSearchChange={setSearch} />
      <Toaster />
      <div className="container mt-4">
        <div className="row">
          {filteredProduct?.map((elem) => (
            <div key={elem._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card h-100 shadow-sm rounded-4">
                <Link
                  to={`/product/${elem._id}`}
                  className="text-decoration-none text-dark"
                >
                  <img
                    src={elem.imageURL}
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className="card-body text-center">
                  <h5 className="card-title">{elem.name}</h5>

                  <p className="text-muted">
                    {elem.description?.slice(0, 50)}...
                  </p>

                  <h6 className="text-success">${elem.price}</h6>
                  <button
                    className="btn btn-primary w-100 "
                    onClick={() => addToCart(elem._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
