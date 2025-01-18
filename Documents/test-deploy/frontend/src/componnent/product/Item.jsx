import React from "react";
import "../product/Item.css";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
const Item = ({
  product
}) => {
  const dispatch = useDispatch();
  return (
  <div className="item">
  
      <img className="image" src={`https://vercel-test-five-peach.vercel.app/${product.image}`} alt="image" width={200}height={200}/>
      <div className="info">
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
      </div>
      
    </div>
  );
};

export default Item;
