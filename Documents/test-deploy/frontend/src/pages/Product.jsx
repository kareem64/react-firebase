import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../css/product.css";
import { addToCart } from "../redux/cartSlice";
const Product = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { products } = useSelector((state) => state.products);
  const product = products.find((product) => product._id === id);
  return (
    <div className="product">
      <div className="product-left">
        {product.image ? (
          <img
            src={`https://vercel-test-kd6mc9anc-kareem64s-projects.vercel.app/${product.image}`}
            alt=""
            width={300}
          />
        ) : (
          ""
        )}
      </div>
      <div className="product-right">
        <h2>{product.name}</h2>
        <p>Price: ${product.price}</p>
        <p>{product.category}</p>
        <p>{product.description}</p>
        <p>❤️❤️❤️❤️❤️</p>
        <button onClick={() => dispatch(addToCart(product))}>
          Add To Cart
        </button>
      </div>
    </div>
  );
};
export default Product;
