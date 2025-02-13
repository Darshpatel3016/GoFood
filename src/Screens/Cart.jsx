import React from "react";
import DeleteIcon from '@mui/icons-material/Delete'
import { useCart, useDispatchCart } from "../Components/ContexReducer";
import axios from "axios";
import { BASE_URL } from "../config";


export default function Cart() {

    let data = useCart();
    let dispatch = useDispatchCart();

    if (data.length === 0) {
        return (
            <div>
                <div className="m-5 w-100 text-center fs-3">The Cart is Empty..!</div>
            </div>
        )
    }

    const handleCheckOut = async () => {

        let userEmail = localStorage.getItem("userEmail");

        let response = await axios.post(`${BASE_URL}/api/orderData`, {

            order_data: data,
            email: userEmail,
            Order_date: new Date().toDateString()
        }, {
            headers: {
                "Content-Type": "application/json"
            },
        });

        console.log("Order Response:", response.status)

        if (response.status === 200) {
            dispatch({ type: "DROP" })
        }
    }


    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    return (

        <div>
            <div className="container m-auto mt-5 table-reponsive  table-responsive-sm table-responsive-md">
                <table className="table table-hover">
                    <thead className="text-success fs-4">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Option</th>
                            <th scope="col">Amount</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>&#8377;{food.price}</td>
                                <td><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button></td>
                            </tr>
                        )
                        )}

                    </tbody>
                </table>

                <div>
                    <h1 className="fs-2">Total Price: &#8377;{totalPrice}/-</h1>
                </div>

                <div>
                    <button className="btn bg-danger mt-5" onClick={handleCheckOut}>Check Out</button>
                </div>

            </div>
        </div>

    )

}