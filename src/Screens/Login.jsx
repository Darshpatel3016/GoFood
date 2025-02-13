import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { BASE_URL } from "../config";



export default function Login() {


  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (event) => {

    event.preventDefault();
    const response = await axios.post(`${BASE_URL}/api/login`, {
      email: credentials.email,
      password: credentials.password
    }, {
      headers: {
        "Content-Type": "application/json"
      },
    });

    const json = response.data;
    console.log(json);

    if (!json.success) {
      alert("Please Enter valid credentials");
    }

    if (json.success) {

      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"))
      navigate("/");
    }



  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }


  return (


    <div>

      <div className='container'>

        <form onSubmit={handleSubmit}>


          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credentials.email} id="Email" onChange={onChange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="Password" onChange={onChange} value={credentials.password} />
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a New user</Link>

        </form>
      </div>



    </div>
  )
}