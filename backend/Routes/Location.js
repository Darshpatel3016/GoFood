const express = require("express");
const router = express.Router();

const getLocationFromCoors = async (lat, long) => {
  return `Lat: ${lat}, Long: ${long}`;
};

router.post("/getlocation", async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const location = await getLocationFromCoors(latitude, longitude);
    res.json({ location });
  } catch (error) {
    console.log("Error fetching location:", error.message);
    return res.status(500).json({ error: "Failed to fetch location" });
  }
});

module.exports = router;
