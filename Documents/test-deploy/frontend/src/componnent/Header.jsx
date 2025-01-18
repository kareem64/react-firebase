import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import cart from "../assets/cart.png";
import order from "../assets/checklist.png";
import logout from "../assets/logout.png";
import "../css/Header.css";
const Header = ({ userName, googleLogout, setUserName, token,getTotalcount ,toast,setToken,admin}) => {
  const navigate = useNavigate();
  const handleGoogleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.href = "/";
  };
const goTocart=()=>{
  navigate('/cart')

}
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="logo" src={logo} alt="" />
      </Link>
      <ul className="links">
        <Link to={"/"}>
          <li>Home</li>
        </Link>
     {admin===1?<Link to={"/upload"}>
        <img src="/images/upload.png" alt="" />
        </Link>:""}   
        {!token ? (
          <Link to={"/register"}>
            <li>Login</li>{" "}
          </Link>
        ) : (
          <div className="profile">
            <li className="user-name">Hi {userName}</li>
            <div className="menu-down">
              <div className="empty"></div>
              <Link to={"/cashdelivery"}>
                <div className="order">
                  <img src={order} alt="" />
                  <p>Orders</p>
                </div>
              </Link>
              <div onClick={handleGoogleLogout} className="logout">
                <img src={logout} alt="" />
                <p>LogOut</p>
              </div>
            </div>
          </div>
        )}
      </ul>

      <div className="cart-header">
   
          <img onClick={goTocart} src={cart} alt="" />
      
        <p className="count">{getTotalcount()}</p>
      </div>
    </div>
  );
};

export default Header;
