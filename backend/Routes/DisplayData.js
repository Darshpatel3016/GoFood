const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {

    try {
        console.log(global.food_item, global.foodCategory);

        if(!global.food_item || global.foodCategory) {
            return res.status(500).json ({error: "Food data not available"});
        }
        res.json([global.food_item, global.foodCategory])

    } catch (error) {
        console.log("Error fetching food data:",error.message);
        res.status(500).json({error: "Internal server error"});
    }
});

module.exports = router;