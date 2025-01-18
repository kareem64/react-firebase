import React, { useEffect } from "react";
import '../css/Cart.css'
import { removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
const Cart = ({ products, items, token, toast,dispatch,getCart ,totalPrice}) => {
  
  return (
    <div className="cart">
      {token ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const item = items.find((i) => i._id === product._id);

              if (item) {
                return (
                  <tr key={product._id}>
                    <td>
                      <img
                        src={`https://vercel-test-five-peach.vercel.app/${product.image}`}
                        alt={product.name}
                        width={100}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{product.price * item.quantity}</td>
                    <td>
                      <button onClick={()=>dispatch(removeFromCart(product,getCart,dispatch))}>
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      ) : (
        <h1 className="mustlogin">You Must Login First</h1>
      )}
   {token&& <div className="total">
      <h1> Total Price : {totalPrice}</h1>
      </div>}
      <div>
    <Link to={'/placeorder'} > <button className="checkout" >
Process checkout
        </button></Link>   
      </div>
    </div>
  );
};

export default Cart;
