import React, { useEffect, useState, useRef } from "react";
import "./Card.css";
import { useDispatchCart, useCart } from "./ContexReducer";
// import { Toast, ToastContainer } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    setToastMessage(`${props.foodItem.name} (${size}) Added to Cart..!!`);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div className="card mt-5">
          <img src={props.foodItem.img} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>

            <div className="container w-100">
              <select
                className="m-2 h-100 bg-success rounded"
                style={{ color: "white" }}
                onChange={(e) => setQty(e.target.value)}
              >
                {Array.from(Array(9), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {" "}
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              <select
                className="m-2 h-100 bg-success rounded"
                style={{ color: "white" }}
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>

              <div className="d-inline font-weight-bold h-100 fs-5 mx-3">
                &#8377;{finalPrice}/-
              </div>

              <hr></hr>

              <button
                className="btn btn-success d-flex justify-center ms-2 my-2"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="toast-container position-fixed bottom-0 end-0 p-3"
        style={{zIndex: 11}}
      >
        <div
          id="liveToast"
          className={`toast ${showToast ? "show" : "hide"}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="toast-header">
            <strong className="me-auto">GoFood Cart</strong>
            <small>Just Now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      </div>

      {/* <ToastContainer className="toast-container position-fixed bottom-0 end-0 p-3">
        <Toast
          show={showToast}
          bg="success"
          onClose={() => setShowToast(false)}
          id="liveToast"
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <Toast className="toast-header">
            <Toast.Header>
              <strong className="me-auto">GoFood Cart</strong>
              <small>Just Now</small>
            </Toast.Header>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
            <Toast.Body className="text-white">
              {props.foodItem.name} Added to Cart{" "}
            </Toast.Body>
          </Toast>
        </Toast>
      </ToastContainer> */}
    </div>
  );
}
