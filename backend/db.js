const mongoose = require("mongoose");
require('dotenv').config();

const mongoURI = process.env.ATLAS_URI;

const mongoDB = async () => {


    try {

        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");


        let data = await mongoose.connection.db.collection("food_item").find({}).toArray();
        let catData = await mongoose.connection.db.collection("foodCategory").find({}).toArray();

        console.log("Fetched food items:", data.length);
        console.log("Fetched food categories:", catData.length);


        global.food_item = data;                              // store globally
        global.foodCategory = catData;


    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

module.exports = mongoDB;


















// try {

//     await mongoose.connect(mongoURI);
//     console.log("Connected to MongoDB");


//     const fetched_data = await mongoose.connection.db.collection("food_item");

//     let data = await fetched_data.find({}).toArray(async function (data) {
//         const foodCategory = await mongoose.connection.db.collection("foodCategory");

//         let catData = await foodCategory.find({}).toArray(function (catData) {

//             global.food_item = data;
//             global.foodCategory = catData;

//         })
//     });

// } catch (err) {
//     console.error("Error connecting to MongoDB:", err);
// }





// try {

//     await mongoose.connect(mongoURI)
//         console.log("Database connected successfully");
//     } catch (error) {
//         console.error("MongoDB connection failed", error);
//     };

// }