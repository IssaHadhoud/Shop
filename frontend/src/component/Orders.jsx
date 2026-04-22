import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getAllOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/order", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
      console.log(res.data.orders);
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-center">Orders</h2>
        <span className="badge bg-primary fs-6">Total: {orders.length}</span>
      </div>
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-header bg-dark text-white">Orders List</div>

        <div className="card-body p-0">
          <table className="table table-hover text-center mb-0">
            <thead className="table-dark">
              <tr>
                <th>#ID</th>
                <th>User</th>
                <th>Total</th>
                <th>Status</th>
                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-5)}</td>
                  <td>{order.user?.name}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>
                  <td>
                    <span className="badge bg-success">
                      {order.status }
                    </span>
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button className="btn btn-primary btn-sm">
                        see more..
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-2 border">
          <button className="btn btn-dark" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
