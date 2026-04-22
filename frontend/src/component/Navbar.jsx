import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../App.css";

const Navbar = ({ onSearchChange }) => {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3  shadow sticky-top ">
      <Link className="navbar-brand fw-bold" to="/">
        Shop
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#nav"
      >
        ☰
      </button>

      <div className="collapse navbar-collapse" id="nav">
        

        <div className="mx-auto search-container">
          <input
            className="form-control"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder="Search products"
          />
        </div>
        <div className="d-flex align-items-center gap-2 ms-auto">
          <Link to="/category" className="btn btn-primary btn-sm mx-2">
          Category
        </Link>
          <Link to="/cart" className="btn btn-success">
            🛒
          </Link>

          <button
            className="btn btn-outline-light"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          {!token ? (
            <Link className="btn btn-outline-primary" to="/login">
              Login
            </Link>
          ) : (
            <>
              {user?.type === "Admin" && (
                <Link className="btn btn-warning" to="/dashboard">
                  Dashboard
                </Link>
              )}

              {user?.type === "User" && (
                <Link className="btn btn-light" to="/profile">
                  Profile
                </Link>
              )}

              <button
                className="btn btn-danger"
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
