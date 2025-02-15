import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { BASE_URL } from "../config";



export default function Signup() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let [address, setAddress] = useState("");
    let navigate = useNavigate()

    const handleClick = async (e) => {
        e.preventDefault();
        let navLocation = () => {
            return new Promise((res, rej) => {
                navigator.geolocation.getCurrentPosition(res, rej);
            });
        }
        let latlong = await navLocation().then(res => {
            let latitude = res.coords.latitude;
            let longitude = res.coords.longitude;
            return [latitude, longitude]
        })
        // console.log(latlong)

        let [lat, long] = latlong
        console.log(lat, long)
        const response = await axios.post(`${BASE_URL}/api/getlocation`, {
            latlong: { lat, long }
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = response.data;

        const { location } = await response.json()
        console.log(location);
        setAddress(location);
        setCredentials({ ...credentials, [e.target.name]: location })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${BASE_URL}/api/createuser`, {

            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = response.data

        console.log("API responce:", json);
        
        if (json.success) {
            //save the auth token to local storage and redirect
            localStorage.setItem('token', json.authToken)
            navigate("/login")
        }
        else {
            alert("Enter Valid Credentials")
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover', height: '100vh' }}>
            <div>
                <Navbar />
            </div>

            <div className='container' >
                <form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>
                    <div className="m-3">
                        <label htmlFor="name" className="form-label" style={{color:"white"}}>Name</label>
                        <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="email" className="form-label" style={{color:"white"}}>Email address</label>
                        <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="m-3">
                        <label htmlFor="address" className="form-label" style={{color:"white"}}>Address</label>
                        <fieldset>
                            <input type="text" className="form-control" name='address' placeholder='"Click below for fetching address"' value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                        </fieldset>
                    </div>
                    <div className="m-3">
                        <button type="button" onClick={handleClick} name="geolocation" className=" btn btn-success">Click for current Location </button>
                    </div>
                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" style={{color:"white"}}>Password</label>
                        <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className="m-3 mx-1 btn btn-danger">Already a user</Link>
                </form>
            </div>
        </div>
    )
}