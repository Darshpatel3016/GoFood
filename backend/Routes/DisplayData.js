const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {

    try {
        console.log(global.food_item, global.foodCategory)
        res.send([global.food_item, global.foodCategory])
    } catch (error) {
        console.log(error.message);
        res.send("server error");
    }
});

module.exports = router;