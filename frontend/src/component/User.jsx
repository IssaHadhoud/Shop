import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import toast,{Toaster} from "react-hot-toast";
import api from "../api";

const User = () => {
  const [user, setUser] = useState("");
  

  useEffect(() => {
    api
      .get(`/user/profile`)
      .then((result) => {
        setUser(result.data.profile);
        console.log(result.data.profile)
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
      });
  }, []);
  if (!user) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border"></div>
      </div>
    );
  }
  return (
    <div>
      <Navbar />
      <Toaster position="top-center" reverseOrder={false} />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">

            <div className="card shadow-lg border-0 rounded-4 text-center p-4">
              
              <div className="mb-3">
                <img
                  src={user.imageURL}
                  alt={user.name}
                  className="rounded-circle shadow"
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <h3 className="fw-bold">{user.name}</h3>
              <p className="text-muted">{user.email}</p>

              <div className="d-flex justify-content-between mt-3">
                <Link to="/">
                  <button className="btn btn-outline-dark px-4">
                     Back
                  </button>
                </Link>
                <Link className="btn btn-primary" to="/order/myOrder">My Order</Link>
                <Link  to="/profile/edit">
                  <button className="btn btn-success ">
                    Edit
                  </button>
                </Link>

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default User;