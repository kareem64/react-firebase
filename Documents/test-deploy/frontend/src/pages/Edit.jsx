import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/CreateProduct.css";
import { toast } from "react-toastify";
const Edit = ({ navigate }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [values, setValues] = useState();
  const [image, setImage] = useState();
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    transformImage(file);
  };
  const submitHandle = async (e) => {
    console.log(values);
    e.preventDefault();
    const data = {
      name: values.name,
      brand: values.brand,
      price: values.price,
      desc: values.desc,
      image,
    };
    const result = await axios.put(
      `https://vercel-test-five-peach.vercel.app/api/cloudinary/updateproduct/${id}`,
      data
    );
    if (result.data.success) {
      toast.success(result.data.message);
      getProduct();
      navigate("/dashboard");
    } else {
      toast.error(result.data.message);
    }
  };

  const getProduct = async () => {
    // fetch product by id and set it to product state
    const responce = await axios.get(
      "https://vercel-test-five-peach.vercel.app/api/cloudinary/getproduct/" + id
    );
    if (responce.data.success) {
      setProduct(responce.data.product);
    } else {
      console.log(responce.data.message);
    }
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

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="create-product">
      <h1>Update Product</h1>
      <div className="inputs">
        <form action="">
        <input
          type="text"
          placeholder="Title"
          name="name"
          defaultValue={product.name}
          onChange={handleChange}
        />
        <select
          onChange={handleChange}
          name="brand"
          defaultValue={product.brand}
        >
          <option value="">Select Category</option>
          <option value="Fruite">Fruite</option>
          <option value="Vigetables">Vigetables</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          placeholder=" Description here!"
          rows={4}
          cols={50}
          name="description"
          defaultValue={product.desc}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Price"
          name="price"
          defaultValue={product.price}
          onChange={handleChange}
        />

        <label htmlFor="file-input">
          <img
            src={image ? image : product?.image?.url}
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
        <button onClick={submitHandle}>Update Product</button>
        <Link to={"/dashboard"}>
          <button>Dash Board</button>
        </Link>
      </div>
        </form>
     
      </div>
    
    </div>
  );
};

export default Edit;
