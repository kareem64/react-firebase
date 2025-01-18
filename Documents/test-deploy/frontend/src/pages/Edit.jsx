import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import "../css/Upload.css";
import {toast}from 'react-toastify'
const Edit = () => {
    const {id}= useParams()
const [product,setProduct]=useState({})
const[values,setValues]= useState()
const [image,setImage]=useState()
const handleChange = (e)=>{
   setValues({...values,[e.target.name]:e.target.value})
}
const handleImageChange = (e)=>{
   setImage(e.target.files[0])
}
const submitHandle = async(e)=>{
  console.log(values)
   e.preventDefault()
   const formData = new FormData()
   formData.append("name", values.name);
   formData.append("price", values.price);
   formData.append("description", values.description);
   formData.append("category", values.category);
   formData.append("quantity", values.quantity);
   formData.append("image", image);
   const result = await axios.put(`http://localhost:4000/api/products/updateproduct/${id}`,formData)
   if(result.data.success){
     toast.success(result.data.message)
     getProduct()
   }else{
     toast.error(result.data.message)
   }
}

const getProduct = async() =>{
    // fetch product by id and set it to product state
    const responce = await axios.post('http://localhost:4000/api/products/getproduct/'+id)
    if(responce.data.success){
        setProduct(responce.data.product)
      
    }else{
        console.log(responce.data.message)
    }
  
}

useEffect(()=>{
getProduct()
},[])
  return (
    <div className="upload">
    <h1>Update Product</h1>
    <div className="inputs">
      <input
        type="text"
        placeholder="Title"
        name="name"
        
        defaultValue={product.name}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Price"
        name="price"
        defaultValue={product.price}
        onChange={handleChange}

      />
      <textarea
        placeholder=" Description here!"
        rows={4}
        cols={50}
        name="description"
        defaultValue={product.description}
        onChange={handleChange}

      />
      <input
        type="text"
        placeholder="Category"
        name="category"
        defaultValue={product.category}
        onChange={handleChange}

      />
      <input
        type="text"
        placeholder="Quantity"
        name="quantity"
        defaultValue={product.quantity}
        onChange={handleChange}

      />
      <label htmlFor="file-input">
        <img
          src={image?URL.createObjectURL(image):`http://localhost:4000/${product.image}`}
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
      <button onClick={submitHandle}>Update Product</button>
      <Link to={'/dashboard'}>
      <button>Dash Board</button>
      </Link>
     
    </div>
    
  </div>
  )
}

export default Edit
