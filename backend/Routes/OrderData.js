const express = require("express");
const router = express.Router();
const Order = require("../models/Order");


router.post("/orderData", async (req, res) => {

    try {

        let data = req.body.order_data
        await data.splice(0, 0, { Order_date: req.body.Order_date });

        // Check if email exists in DB

        let eId = await Order.findOne({ 'email': req.body.email })
        console.log(eId);

        if (!eId) {      // If email doesn't exist, creare a new order

            try {
                await Order.create({
                    email: req.body.email,
                    order_data: [data]
                });
                return res.json({ success: true });

            } catch (error) {
                console.log("Order Creation Error:", error.message);
                return res.status(500).json({ error: "Server Error", message: error.message });
            }
        } else {         // if email exists, update the order

            try {
                await Order.findOneAndUpdate({ email: req.body.email },
                    { $push: { order_data: data } }
                );
                return res.json({ success: true });

            } catch (error) {
                console.log("Order Update Error:", error.message);
                return res.status(500).json({ error: "Server Error", message: error.message });
            }
        }
    } catch (error) {
        console.log("General Error:", error.message);
        return res.status(500).json({ error: "Server Error", message: error.message });
    }
});


router.post("/myOrderData", async (req, res) => {

    try {

        let myData = await Order.findOne({ "email": req.body.email })
        res.json({orderData: myData})

    } catch (error) {

        res.send("Server Error", error.message);

    }
})


module.exports = router;