import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

const SingleOrder = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [order, setOrder] = useState("");

  const navigate = useNavigate();

  const getOrder = async () => {
    try {
      const res = await api.get(`/order/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.order);
      setOrder(res.data.order);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);
  return (
    <div>
      <div className="row">
        {order && (
          <div className="col-12 mb-4" key={order._id}>
            <div className="card shadow border-0 rounded-3">
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3 rounded-3">
                <div>
                  <span className="text-muted small uppercase">
                    Order Owner :
                  </span>
                  <span className="fw-bold text-primary">
                      {order.user?.name}
                  </span>
                </div>
                <span
                  className={`badge rounded-pill ${
                    order.status === "delivered"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h6 className="text-muted mb-3">Items:</h6>
                    <ul className="list-unstyled">
                      {order.items.map((item) => (
                        <li key={item._id} className="mb-2">
                          <i className="bi bi-check2-circle text-success me-2"></i>
                          {item.quantity} x Product :{item.product.name} (at $
                          {item.price})
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-md-4 text-md-end mt-3 mt-md-0 border-start">
                    <p className="text-muted mb-1">Total Amount</p>
                    <h3 className="text-success fw-bold">
                      ${order.totalPrice}
                    </h3>
                    <small className="text-muted">
                      Placed on: {order.createAt}
                    </small>

                    <button
                      className="btn btn-dark"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleOrder;
