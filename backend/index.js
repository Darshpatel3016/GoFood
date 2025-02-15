const express = require("express");
const cors = require("cors");

const app = express()
const port = 5000
const mongoDB = require("./db");

mongoDB();

app.use(cors({
    origin: "https://gofood-frontendd.onrender.com",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true
}));


app.use(express.json())
app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));


app.get("/", (req, res) => {
    res.send("Hello world");
})


app.listen(port, () => {
    console.log(`app is listening on port ${port}`)
});