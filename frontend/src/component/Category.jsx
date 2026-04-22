import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from '../api'


const Category = () => {
  const [category, setCategory] = useState([]);
  const navigate=useNavigate();
  const token =localStorage.getItem("token")
     let user = null;
      if (token) {
        try {
          user = jwtDecode(token);
          console.log(user);
        } catch (err) {
          token.error(err);
        }
      }
  const getCategory = async () => {
    try {
      const res = await api.get(`/category`);
      setCategory(res.data.category);
      console.log(res.data.category)
    } catch (err) {
        toast.error(err.response.data.message)
    }
  };
const getProducts=async(id)=>{
    navigate(`/category/${id}`)
}

  useEffect(()=>{
    getCategory();

  },[])
  return (
 <div className="container mt-5">
  <h2 className="text-center mb-4 fw-bold">Categories</h2>

  <div className="row">
    {category.map((elem) => (
      <div key={elem._id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div className="card category-card h-100 shadow-sm">
          
          <img
            src={elem.imageURL}
            className="card-img-top"
            alt={elem.title}
          />

          <div className="card-body text-center">
            <h5 className="card-title">{elem.title}</h5>
            <p className="text-muted">
              {elem.description?.slice(0, 60)}...
            </p>
                {user?.type === "Admin" && (
                <>
                <Link to={`/category/edit/${elem._id}`}>
                  {" "}
                  <button className="btn btn-success">Edit</button>
                </Link>
                </>)}
            <button className="btn btn-outline-primary w-100" onClick={()=>getProducts(elem._id)}>
              View Products
            </button>
            
          </div>

        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default Category;
