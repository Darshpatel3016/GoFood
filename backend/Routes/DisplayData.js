const express = require("express");
const router = express.Router();

router.get("/foodData", (req, res) => {

    try {
        console.log("global food item:", global.food_item);
        console.log("global food categories:", global.foodCategory);

        if(!global.food_item || !global.foodCategory) {
            return res.status(500).json ({error: "Food data not available"});
        }
        res.json(
            {
                food_item: global.food_item,
                foodCategory:global.foodCategory
            });

    } catch (error) {
        console.log("Error fetching food data:",error.message);
        res.status(500).send("server error");
    }
});

module.exports = router;