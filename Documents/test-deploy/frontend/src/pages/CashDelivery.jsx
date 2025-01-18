import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/CashDelivery.css";
const CashDelivery = ({ token }) => {
  const [userorder, setUserOrder] = useState();
  const[total,setTotal]=useState()
  
  
  const getUserOrders = async () => {
    //fetch user orders from server
    const response = await axios.get(
      "http://localhost:4000/api/orders/getuserorders",
      { headers: { token } }
    );

    if (response.data.success) {
      setUserOrder(response.data.userOrders);
      userorder?.map((item)=>{
        setTotal(item.amount)
       
      })
    } else {
      console.log("Failed to fetch orders:", response.data);
    }
  };
  useEffect(() => {
    getUserOrders();
    
  }, [getUserOrders]); // Only run the effect once

  return (
    <div className="cash-delivery">
     <div className="delivery">
     <div className="address">
        {userorder?.map((item) => {
          return item.address.map((addressItem) => {
            return (
              <div key={addressItem._id}>
                <p>FirstName: {addressItem.values.firstName}</p>
                <p>LastName: {addressItem.values.lastName}</p>
                <p>Email: {addressItem.values.email}</p>
                <p>Street: {addressItem.values.street}</p>
                <p>City: {addressItem.values.city}</p>
                <p>Country: {addressItem.values.country}</p>
                <p>ZipCode: {addressItem.values.zipCode}</p>
                <p>Phone: {addressItem.values.phone}</p>
              </div>
            );
          });
        })}
      </div>
      <div>
        {userorder?.map((item) => {
          return item.items.map((dataItem) => {
            return (
              <div className="productinfo" key={dataItem._id}>
                <div>
                  <p>Title: {dataItem.name}</p>
                  <p>Price: {dataItem.price}</p>
                  <p>Qty: {dataItem.quantity}</p>
                </div>
                <img
                  src={`http://localhost:4000/${dataItem.image}`}
                  alt="image"
                />
            
              </div>
            );
          });
        })}
      </div>
     </div>
      <div className="total"> 
        <p>Total: ${total?total:""}</p>
      </div>
    </div>
  );
};

export default CashDelivery;
