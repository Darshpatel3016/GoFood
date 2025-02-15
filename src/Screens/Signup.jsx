import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { BASE_URL } from "../config";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      let [lat, long] = await getUserlocation();

      console.log("Latitude:", lat, "Longitude:", long);

      const response = await axios.post(
        `${BASE_URL}/api/getlocation`,
        {
          latitude: lat,
          longitude: long,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Location API response:", response.data);

      if (!response.data.location) {
        alert("Failed to fetch location...!");
        return;
      }

      setAddress(response.data.location);
      setCredentials((prev) => ({
        ...prev,
        geolocation: response.data.location,
      }));
    } catch (error) {
      console.error(
        "Error fetching Location:",
        error.response?.data || error.message
      );
      alert("Failed to fetch Location...!");
    }
  };

  const getUserlocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latitude = position.coords.latitude;
          let longitude = position.coords.longitude;
          resolve([latitude, longitude]);
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert("Please allow location access...!");
          reject(error);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Credentials:", credentials);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/createuser`,
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Signup API responce:", response.data);

      if (response.data.success) {
        //save the auth token to local storage and redirect
        localStorage.setItem("token", response.data.authToken);
        navigate("/login");
      } else {
        alert("Enter Valid Credentials");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("Signup failed... please try again");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
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
            className="row border border-bottom border-success my-2"
            style={{ color: "white" }}
          >
            Welcome to Our Food App..!
          </div>
          <div className="m-3">
            <label
              placeholder="Please Enter Your Name"
              htmlFor="name"
              className="form-label"
              style={{ color: "white" }}
            >
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              id="name"
              value={credentials.name}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label
              placeholder="Please Enter Your Email"
              htmlFor="email"
              className="form-label"
              style={{ color: "white" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={credentials.email}
              onChange={onChange}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="m-3">
            <label
              htmlFor="address"
              className="form-label"
              style={{ color: "white" }}
            >
              Address
            </label>
            <fieldset>
              <input
                type="text"
                className="form-control"
                name="address"
                id="address"
                placeholder="Click below for fetching address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                aria-describedby="emailHelp"
              />
            </fieldset>
          </div>
          <div className="m-3">
            <button
              type="button"
              onClick={handleClick}
              name="geolocation"
              className="btn btn-success"
            >
              Click for current Location{" "}
            </button>
          </div>
          <div className="m-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "white" }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={onChange}
              name="password"
              id="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user
          </Link>
          <Link to="/" className="m-3 mx-1 btn btn-light">
            Home
          </Link>
        </form>
      </div>
    </div>
  );
}
