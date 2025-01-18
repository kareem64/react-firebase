import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/Dashboard.css";
import { deleteProduct, fetchProducts } from "../redux/productSlice";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'
const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const reloadPage =()=>{
    dispatch(fetchProducts())
  }
  //delete product
  const delete_Product = (id) => {
    dispatch(deleteProduct({id,toast,reloadPage}));
  };
  useEffect(() => {
    reloadPage()
  }, [dispatch]);
  return (
    <div className="dash-board">
      <table>
        <thead>
      <tr>
      <th>Product</th>
          <th>Title</th>
          <th>price</th>
          <th>Description</th>
          <th>Category</th>
          <th>Delete</th>
          <th>Update</th>
      </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>
                  <img
                    src={`http://localhost:4000/${product.image}`}
                    alt=""
                    width={100}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => delete_Product(product._id)}>
                    Delete
                  </button>
                </td>
                <td>
               <Link to={'/edit/'+product._id}><button>Edit</button></Link>   
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
