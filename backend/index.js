const express = require("express");
const app = express()
const port = 5000
const mongoDB = require("./db")
const cors = require("cors");

mongoDB();

app.use(cors({
    origin: "https://gofood-frontendd.onrender.com",
    credentials: true
}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

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