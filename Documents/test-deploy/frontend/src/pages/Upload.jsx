import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../css/Upload.css";
import { addProduct, fetchProducts } from "../redux/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Upload = () => {
  const [image, setImage] = useState();
  const [values, setValues] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

  };
  console.log(values);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const dashBoardData = (e) => {
    e.preventDefault();
    dispatch(fetchProducts())
    navigate("/dashboard");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   
    
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("quantity", values.quantity);
    formData.append("image", image);

    dispatch(addProduct({ formData, toast, navigate }));
  };
  return (
    <div className="upload">
      <h1>Admin Panel</h1>
      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />
        <textarea
          placeholder=" Description here!"
          rows={4}
          cols={50}
          name="description"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Category"
          name="category"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Quantity"
          name="quantity"
          onChange={handleChange}
        />
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : "/images/upload.png"}
            alt="upload Image"
            width={100}
            height={100}
          />
        </label>
        <input
          type="file"
          hidden
          id="file-input"
          onChange={handleImageChange}
        />
      </div>
      <div className="admin-btn">
        <button onClick={handleSubmit}>Add New Product</button>
      <button onClick={dashBoardData}>Dash Board</button>
      </div>
      
    </div>
  );
};

export default Upload;
