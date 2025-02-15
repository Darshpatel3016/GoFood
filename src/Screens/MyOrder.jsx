import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { BASE_URL } from "../config";



export default function MyOrder() {

    const [orderData, setOrderData] = useState([])

    const fetchMyOrder = async () => {

        try {

            console.log(localStorage.getItem('userEmail'));

            const { data } = await axios.post(`${BASE_URL}/api/myOrderData`, {
                email: localStorage.getItem('userEmail')
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setOrderData(data);
        } catch (error) {
            console.log("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchMyOrder()
    }, [])



    return (

        <>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>

                    {orderData != {} ? Array(orderData).map(data => {

                        return (
                            data.orderData
                                ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {

                                    return (

                                        item.map((arrayData) => {

                                            return (

                                                <div>
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />

                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >

                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "130px" }}>

                                                                <div className="card-body">
                                                                    <h5 className="card-title">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                        <span className='m-1'>{arrayData.qty}</span>
                                                                        <span className='m-1'>{arrayData.size}</span>
                                                                        <span className='m-1'>{data}</span>
                                                                        <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                                                                            ₹{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}