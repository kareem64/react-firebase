import React from "react";
import "../product/Item.css";
import { addToCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
const Item = ({
  product
}) => {
  const dispatch = useDispatch();
  return (
  <div className="item">
  
      <img className="image" src={product.image.url} alt="image" width={200}height={200}/>
      <div className="info">
        <p>{product.name}</p>
        <p>${product.price}</p>
        <p>{product.desc}</p>
        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
      </div>
      
    </div>
  );
};

export default Item;
