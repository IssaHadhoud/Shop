import React, { useEffect, useState } from "react";
import api from "../api"
import "../App.css";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([]);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const getUsers = async () => {
    try {
      const res = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(res.data.users);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      if (!window.confirm("Are you sure you want to delete this user?")) return;

      const res = await api.delete(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      getUsers();
    } catch (err) {
      const message = err.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  const getProduct = async () => {
    try {
      const res = await api.get(`/product`);
      setProduct(res.data.product);
      console.log(res.data.product);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const getOrders = async () => {
    try {
      const res = await api.get(`/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(res.data.orders);
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };
  const adminCount = users.filter((u) => u.role === "Admin").length;
  const userCount = users.filter((u) => u.role !== "Admin").length;

  const roleChartData = {
    labels: ["Admin", "User"],
    datasets: [
      {
        data: [adminCount, userCount],
        backgroundColor: ["#1cc88a", "#36b9cc"],
      },
    ],
  };

  const productSales = {};

  orders.forEach((order) => {
    order.items.forEach((item) => {
      console.log(item)
      const name = item.product?.name

      if (!productSales[name]) {
        productSales[name] = 0;
      }

      productSales[name] += item.quantity;
    });
  });

  const sortedProducts = Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const topProductsChart = {
    labels: sortedProducts.map((p) => p[0]),
    datasets: [
      {
        label: "Top Products",
        data: sortedProducts.map((p) => p[1]),
        backgroundColor: [
          "#4e73df",
          "#1cc88a",
          "#36b9cc",
          "#f6c23e",
          "#e74a3b",
        ],
      },
    ],
  };

  useEffect(() => {
    getUsers();
    getProduct();
    getOrders();
  }, []);

  return (
    <div className="dashboard">
      <nav className="navbar navbar-dark bg-dark shadow-sm px-4">
        <span className="navbar-brand fw-bold">Admin Panel</span>

        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>

      <div className="d-flex">
        <div className="sidebar border rounded">
          <Link to="/create" className="sidebar-link">
            
            Create Product
          </Link>
          <Link to="/orders" className="sidebar-link">
            
            Orders
          </Link>
          <Link to="/category/create" className="sidebar-link">
            Category
          </Link>
        </div>

        <div className="main-content flex-grow-1">
          <div className="row mt-4">
            <div className="col-md-6">
              <div className="card p-3 shadow-sm">
                <h5 className="text-center">Roles Distribution</h5>
                <Pie data={roleChartData} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="card p-3 shadow-sm">
                <h5 className="text-center">Top Products</h5>
                <Bar data={topProductsChart} />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-md-4">
              <div className="card p-3 text-center">
                <h6>Users</h6>
                <h2>{users.length}</h2>
              </div>
            </div>

            <div className="col-md-4">
              <div>
                <Link
                  className="card p-3 text-center text-decoration-none"
                  to="/"
                >
                  <h6>Products</h6>
                  <h2>{product.length}</h2>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div>
                <Link
                  className="card p-3 text-center text-decoration-none"
                  to="/orders"
                >
                  <h6>Orders</h6>
                  <h2>{orders.length}</h2>
                </Link>
              </div>
            </div>
          </div>

          <div className="card mt-4 shadow-lg border-0 rounded-4">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Users List</h5>
            </div>

            <div className="card-body p-0">
              <table className="table table-hover mb-0 text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((elem) => (
                    <tr key={elem._id}>
                      <td className="fw-semibold">{elem.name}</td>
                      <td>{elem.email}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteUser(elem._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
           <div className="mt-2 border d-flex justify-content-center">
        <button className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
        </div>
        </div>
        
      </div>
    </div>
  );
};
export default Dashboard;
