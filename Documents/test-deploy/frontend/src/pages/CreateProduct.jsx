import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../css/CreateProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/productSlice";
const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [values, setValues] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    transformImage(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values, image);
    const data = {
      name: values.name,
      brand: values.brand,
      price: values.price,
      desc: values.desc,
      image,
    };
    dispatch(addProduct({ data, toast, navigate }));
  };
  const transformImage = (file) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = (e) => {
        setImage(reader.result);
      };
    } else {
      setImage("");
    }
  };

  return (
    <div className="create-product">
      <h1>Add Product</h1>
      <div className="inputs">
        <form action="">
          <input
            type="text"
            onChange={handleChange}
            required
            placeholder="Name"
            name="name"
          />
          <select onChange={handleChange} name="brand">
            <option value="">Select Category</option>
            <option value="Fruite">Fruite</option>
            <option value="Vigetables">Vigetables</option>
            <option value="Others">Others</option>
          </select>
          <textarea
            rows={4}
            cols={50}
            onChange={handleChange}
            required
            placeholder="Insert Description Here!"
            name="desc"
          />
          <input
            type="number"
            onChange={handleChange}
            required
            placeholder="Price"
            name="price"
          />

          <label htmlFor="file-input">
            <img
              src={image ? image : "/images/upload.png"}
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
          <div className="admin-btn">
            <button onClick={handleSubmit}>add product</button>
            <Link to={"/dashboard"}>
              <button>Dash Board</button>
            </Link>
          </div>
        </form>
      </div>
      {/* <div className="image">
        {image ? <img src={image} alt="" /> : "image will apear here!"}
      </div> */}
    </div>
  );
};

export default CreateProduct;
