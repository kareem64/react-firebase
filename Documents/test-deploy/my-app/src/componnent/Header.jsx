import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <h1>Welcome to My React App</h1>
      <p>This is a simple React app</p>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>
        <Link to={"/login"}>
          <li>Login</li>
        </Link>
        <Link to={"/register"}>
          <li>Register</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
