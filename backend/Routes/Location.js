const express = require("express");
const router = express.Router();

const getLocationFromCoors = async (lat, long) => {
    return 'Lat: ${lat}, Long: ${long}';
};

router.post("/getlocation", async (req, res) => {
    try {
        const{latlong} = req.body;

        if(!latlong || !latlong.lat || !latlong.long) {
            return res.status(400).json({error: "Latitude and Longitude are required"});
        }

        const location = await getLocationFromCoors(latlong.lat, latlong.long);
        return res.json({location});
    } catch (error) {
        console.log("Error fetching location:", error.message);
        return res.status(500).json({error: "Server error"});
    }
});

module.exports = router;