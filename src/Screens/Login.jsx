import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";
import Navbar from "../Components/Navbar";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(
      `${BASE_URL}/api/login`,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const json = response.data;
    console.log(json);

    if (!json.success) {
      alert("Please Enter valid credentials");
    }

    if (json.success) {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <div className="container d-flex align-items-center justify-content-center">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div
            className="row-2 fs-3 d-flex justify-content-center border-bottom border-success border-3 m-2"
            style={{ color: "white" }}
          >
            Hey, Foodiee Login Here..!
          </div>
          <div className="m-3">
            <label
              htmlFor="Email"
              className="form-label"
              style={{ color: "white" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              id="Email"
              onChange={onChange}
            />
          </div>

          <div className="m-3">
            <label
              htmlFor="Password"
              className="form-label"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="Password"
              onChange={onChange}
              value={credentials.password}
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            I'm a New user
          </Link>
          <Link to="/" className="m-3 btn btn-light">
            Home
          </Link>
        </form>
      </div>
    </div>
  );
}
