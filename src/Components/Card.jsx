import React, { useEffect, useState, useRef } from "react";
import "./Card.css";
import { useDispatchCart, useCart } from "./ContexReducer";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();

  let options = props.options;
  console.log("options received in card", props.options)
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(Object.keys(options)[0] || "");

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
  };

  if (!size || !options[size]) {
    console.warn("Invalid size:", size, "Available options:", options);
  }
  let finalPrice = qty * (options[size] ? parseInt(options[size]) : 0);

  useEffect(() => {
    if (priceRef.current) {
      console.log("Intial size set to:", priceRef.current.value);
      setSize(priceRef.current?.value || Object.keys(options)[0]);
    }
  }, [options]);

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
    </div>
  );
}
