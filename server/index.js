const express = require("express");
const mongoose  = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => 
        console.log("Database connected Successfully!!")
    ).catch((err) => console.log(err));


app.listen(port, () => {
    console.log(`Server up and running on port : ${port}`);
});