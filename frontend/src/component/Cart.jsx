import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("sessionId");

  const getCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/cart/${sessionId}`);

      setCart(res.data.cart.items);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cart/${sessionId}/${id}`);

      getCart();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await axios.put(`http://localhost:5000/cart/update/${sessionId}/${id}`, {
        quantity,
      });

      getCart();
    } catch (err) {
      toast.error(err.data?.message);
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + (item.product?.price || 0) * item.quantity,
    0,
  );

  const checkOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/order/checkout",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      navigate("/order/myOrder");
      getCart();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="table-responsive rounded-3">
          <table className="table table-bordered table-hover text-center align-middle  shadow">
            <thead className="table-dark ">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Image</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((elem) => (
                <tr key={elem._id}>
                  <td>{elem.product?.name}</td>

                  <td className="text-success fw-bold">
                    ${elem.product?.price}
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => updateQuantity(elem.product._id, "dec")}
                    >
                      -
                    </button>

                    <span className="mx-2">{elem.quantity}</span>

                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => updateQuantity(elem.product._id, "inc")}
                    >
                      +
                    </button>
                  </td>

                  <td>
                    <img
                      src={elem.product?.imageURL}
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </td>

                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(elem.product._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border d-flex mb-3  align-items-center gap-2">
            <button className="btn btn-success p-2" onClick={checkOut}>
              CheckOut
            </button>
            <button className="btn btn-dark p-2 " onClick={() => navigate("/")}>
              Back
            </button>
            <div className="ms-auto p-2">
            <h4 className="text-end mt-4">
              Total: <span className="text-success">${total.toFixed(2)}</span>
            </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
