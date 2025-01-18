import React, { useState } from "react";
import "../css/Log_Reg.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
//vercel url: https://vercel-test-five-peach.vercel.app
const Register = ({ setUserName, setToken, token }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState("LogIn");
  const [values, setValues] = useState();
  const changeHandle = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    const result = await axios.post(
      `https://vercel-test-five-peach.vercel.app/api/users/${
        form === "LogIn" ? "signin" : "signup"
      }`,
      values
    ); //get data from mongo db
    if (result.data.success) {
      toast.success(result.data.message);
      localStorage.setItem("token", result.data.token);
      window.location.href = "/";
    } else {
      toast.error(result.data.message);
    }
  };
  //google sign in
  const mygoogleLogin = useGoogleLogin({
    onSuccess: async (tokenresponce) => {
      console.log(tokenresponce);

      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenresponce.access_token}` },
        })
        .then((res) => res.data);
      console.log(userInfo);
      const email = userInfo.email;
      const name = userInfo.given_name;
      const password = "";
      // const token = tokenresponce.access_token;

      const result = { email, name, password };

      const response = await axios.post(
        "https://vercel-test-kd6mc9anc-kareem64s-projects.vercel.app/api/users/googlesignin",
        result
      );
      if (response.data.success) {
        console.log(response.data);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        console.log(response.data.name);
        localStorage.setItem("token", response.data.token);

        window.location.href = "/";
        toast.error(response.data.message);
      }
    },
    onError: (error) => console.error(error),
  });
  return (
    <div className="register">
      <h2>{form}</h2>
      <div className="inputs">
        {form === "Register" ? (
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={changeHandle}
          />
        ) : (
          ""
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={changeHandle}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={changeHandle}
        />
        {form === "LogIn" ? (
          <p>
            dont have account?
            <span onClick={() => setForm("Register")}>register Here!</span>
          </p>
        ) : (
          <p>
            Have account?
            <span onClick={() => setForm("LogIn")}>Login Here!</span>
          </p>
        )}
        <button className="reg-btn" onClick={submitHandle} type="submit">
          {form}
        </button>
        <p className="or">Or</p>
        <button className="sign-google" onClick={mygoogleLogin}>
          signIn with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
