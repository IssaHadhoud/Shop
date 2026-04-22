import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import toast,{Toaster} from "react-hot-toast";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
const [preview, setPreview] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get("https://shop-yp92.onrender.com/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = res.data.profile;
        setEmail(data.email);

        setName(data.name);
        setImage(data.imageURL);
      } catch (err) {
        toast(err.response?.data?.message);
      }
    };

getUser();
  }, []);

  const editUser = async () => {
    if (!name ||!email|| !image) {
  return toast.error("Please fill all fields");
}
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("image", image);

      await axios.put(`https://shop-yp92.onrender.com/user/profile/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/profile");
    } catch (err) {
      toast.error(err.response?.data?.message);
    }
  };

  return (
    <div>
      <Toaster/>
      <Navbar />
      <div>

      <div className="d-flex justify-content-center mt-5 p-5">
        <div className="card p-5  rounded-4 shadow gap-3">
             <div className="text-center mb-3">
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                />
              ) : (
                <p className="text-muted">No image selected</p>
              )}
            </div>
          <input
            type="text"
            placeholder="Enter your name"
            className="form-control"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
         
            <input
              type="file"
              className="form-control mb-3"
              onChange={(e) => {
                const file = e.target.files[0];
                setImage(file);
                setPreview(URL.createObjectURL(file));
              }}
            />
          <input
            type="text"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>

          <div className="d-flex justify-content-center gap-2">
        
            <button className="btn btn-outline-success" onClick={()=>editUser(id)}>
              Edit
            </button>
             <button className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default EditProfile;
