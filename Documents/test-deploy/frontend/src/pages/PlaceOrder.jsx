import React, { useEffect, useState } from "react";
import "../css/PlaceOrder.css";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const PlaceOrder = ({ products, totalPrice, items, token ,toast,navigate}) => {
  const [indicator, setIndicator] = useState("cash");
  const [values, setValues] = useState();
  const deliveryFee = totalPrice===0? 0 :10;
  const changeHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };
useEffect(()=>{


},[])


const orderItems = [];
    products.map((product) => {
      let item = items.find((i) => i._id === product._id);
      if (item) {
        orderItems.push({
          ...item,
          price: product.price,
          name: product.name,
          quantity: item.quantity,
          image: product.image
        });
      }
    });


  
  // handel strioe payment method
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51POL48GwYlINUcxjIti8ahp6Com3y0ggnwfm8034nxqpfvbjCiaS7TknUBSWy6A6mOuduJZ6csBke49kq9kdn0xM00xiI34Udx"
    );
    
    const body = {
      products: orderItems,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const responce = await fetch(
      "https://vercel-test-kd6mc9anc-kareem64s-projects.vercel.app/api/orders/checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await responce.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      toast.error(result.error.message);
    }
  };
  ////////////////////////////////////////////////////////////
  const submitHandle = async (e) => {
    if (!values){
      toast.error("Please fill all fields");
      return;
    }
    e.preventDefault();
    let orderData = {
      address: [{values}],
      items: orderItems,
      amount: totalPrice,
    };
    let response = await axios.post(
      "https://vercel-test-kd6mc9anc-kareem64s-projects.vercel.app/api/orders/placeorder",
      orderData,
      { headers: { token } }
    );
    if (response.data.success) {
     toast.success(response.data.message)
     navigate('/cashDelivery')
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="place-order">
      <div className="order-left">
        <h2>Delivery iformation--</h2>
        <div className="inputs">
          <div className="name">
            <input
              type="text"
              placeholder="FirstName"
              name="firstName"
              onChange={changeHandle}
            />
            <input
              type="text"
              placeholder="last Name"
              name="lastName"
              onChange={changeHandle}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={changeHandle}
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            onChange={changeHandle}
          />
          <div className="name">
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={changeHandle}
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              onChange={changeHandle}
            />
          </div>
          <div className="name">
            <input
              type="number"
              placeholder="Zipcode"
              name="zipCode"
              onChange={changeHandle}
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              onChange={changeHandle}
            />
          </div>
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            onChange={changeHandle}
          />
        </div>
      </div>
      <div className="order-right">
        <h2>Cart Total--</h2>
        <div className="cart-total">
          <p>{`SubTotal : $ ${totalPrice}.00`}</p>
          <p>{`Delivery Fee $ : ${deliveryFee}`}</p>
          <p>Total: $ {totalPrice + deliveryFee}</p>
        </div>
        <div className="payment-method">
          <div className="stripe" onClick={() => setIndicator("stripe")}>
            <p className={indicator === "stripe" ? "circle" : ""}></p>
            <img src="/images/stripe.png" alt="" />
          </div>
          <div className="cash" onClick={() => setIndicator("cash")}>
            <p className={indicator === "cash" ? "circle" : ""}></p>
            <p>Cash on Delivery</p>
          </div>
        </div>

        <button
          className="order-btn"
          onClick={indicator === "cash" ? submitHandle : makePayment}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
