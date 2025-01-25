import axios from "axios";
import React, { useState } from "react";

const CreateProduct = () => {
  const [image, setImage] = useState("");
  const [values, setValues] = useState();
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
    console.log(values,image);
    const responce = await axios.post('https://vercel-test-five-peach.vercel.app/api/cloudinary/addnewproduct', {
        name: values.name,
        brand: values.brand,
        price: values.price,
        desc: values.desc,
        image
    })
    if(responce.data.success){
        console.log(responce.data.message)
        console.log(responce.data)
    }else{
        console.log(responce.data.message)
    }
    // upload image and send data to server
  }
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
      <h1>create Product</h1>
      <div className="inputs">
        <form action="">
          <input
            type="file"
            accept="image"
            onChange={handleImageChange}
            required
          />
          <input
            type="text"
            onChange={handleChange}
            required
            placeholder="Name"
            name="name"
          />
          <select onChange={handleChange} name="brand">
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Books">Books</option>
            <option value="Home">Home</option>
            <option value="Others">Others</option>
          </select>
          <input
            type="text"
            onChange={handleChange}
            required
            placeholder="desc"
            name="desc"
          />
          <input
            type="number"
            onChange={handleChange}
            required
            placeholder="Price"
            name="price"
          />
          <button onClick={handleSubmit}>add product</button>
        </form>
      </div>
      <div className="image">
        {image ? <img src={image} alt="" /> : "image will apear here!"}
      </div>
    </div>
  );
};

export default CreateProduct;
