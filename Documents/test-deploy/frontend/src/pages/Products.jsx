import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Products = () => {
  const [products, setProducts] = useState();
  const fetchProducts = async () => {
    const responce = await axios.get(
      "https://vercel-test-five-peach.vercel.app/api/cloudinary/getallproducts"
    );
    if (responce.data.success) {
      setProducts(responce.data.products);
    } else {
      console.log(responce.data.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const deleteItem = async (id) => {
    const responce = await axios.delete(
      `https://vercel-test-five-peach.vercel.app/api/cloudinary/deleteproduct/${id}`
    );
    if (responce.data.success) {
      console.log(responce.data.message);
      console.log(responce.data.myproduct);
      console.log(responce.data.imgId);
      fetchProducts();
    } else {
      console.log(responce.data.message);
    }
  };
  const updateItem = async (id) => {
    const responce = await axios.put(
      `https://vercel-test-five-peach.vercel.app/api/cloudinary/updateproduct/${id}`
    );
    if (responce.data.success) {
      console.log(responce.data.message);
      console.log(responce.data.myproduct);
      console.log(responce.data.imgId);
      fetchProducts();
    } else {
      console.log(responce.data.message);
    }
  };
  console.log(products);
  return (
    <div className="products">
      <div className="product-content">
        <h1>All Products</h1>
      </div>
      <Link to={"/createproduct"}>
        <button>Add New Product</button>
      </Link>
      <div>
        {products &&
          products.map((product) => {
            return (
              <div key={product._id}>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image.url} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.price}</p>
                  <button onClick={() => deleteItem(product._id)}>
                    delete
                  </button>
                  <button onClick={() => updateItem(product._id)}>
                    update
                  </button>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
