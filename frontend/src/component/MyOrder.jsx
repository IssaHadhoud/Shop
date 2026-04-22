import axios from "axios";
import React, { useEffect, useState } from "react";
import toast,{Toaster} from "react-hot-toast";
import Navbar from "./Navbar";
import { useNavigate, useParams } from "react-router-dom";

const MyOrder = () => {
  // const {id}=useParams()
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
   const token = localStorage.getItem("token");
  const getMyOrders = async () => {
    try {
      const res = await axios.get(`https://shop-yp92.onrender.com5000/order/myOrder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.order);
      console.log(res.data.order)
    } catch (err) {
      console.error(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    getMyOrders();
  }, []);

  return (
    <div>
      <Navbar />
       <Toaster />
      <div className="container mt-5">
        <h2 className="mb-4 fw-bold ">My Order History</h2>
        {orders.length === 0 ? (
          <div className="alert alert-info">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-12 mb-4" key={order._id}>
                <div className="card shadow border-0 rounded-3">
                  <div className="card-header bg-white d-flex justify-content-between align-items-center py-3 rounded-3">
                    <div>
                      <span className="text-muted small uppercase">
                        Order Owner :
                      </span>
                      <span className="fw-bold text-primary"> {order.user?.name}</span>
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
                          {order.items.map((item, index) => (
                            <li key={index} className="mb-2">
                              <i className="bi bi-check2-circle text-success me-2"></i>
                              {item.quantity} x Product : {item.product.name}(at ${item.price})
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-md-4 text-md-end mt-3 mt-md-0 border-start">
                        <p className="text-muted mb-1">Total Amount</p>
                        <h3 className="text-success fw-bold">
                          ${order.totalPrice.toFixed(2)}
                        </h3>
                        <small className="text-muted"> 
                          Placed on: {order.createAt}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                
                  
              </div>
            ))}
            <div>
              <button className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
              </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrder;
