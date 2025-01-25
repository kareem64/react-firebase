import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Products = () => {
  const [products,setProducts]= useState()
  const fetchProducts = async()=>{
const responce = await axios.get('https://vercel-test-five-peach.vercel.app/api/cloudinary/getallproducts')
  if(responce.data.success){
    setProducts(responce.data.products)
  }else{
    console.log(responce.data.message)
  }

  }
  useEffect(()=>{
    fetchProducts()
  },[])
  console.log(products)
  return (
    <div className='products'>
        <div className="product-content">
        <h1>All Products</h1>
        </div>
       <Link to={'/createproduct'}>
       <button>Add New Product</button>
       </Link> 
       {
         products && products.map(product=>(
           <div key={product._id}>
             <Link to={`/product/${product._id}`}>
             <img src={product.image.secure_url} alt={product.name} />
             <h3>{product.name}</h3>
             <p>{product.price}</p>
             </Link>
           </div>
         ))  || <h1>No Products Found</h1>  // loading state while fetching data 
        
        }
        {
          products && products.length>0 && <Link to={`/admin/edit/${products[0]._id}`}>
          <button>Edit First Product</button>
          </Link>  // edit button for first product if any
        }
       
    </div>
  )
}

export default Products
