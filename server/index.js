const express = require("express");
const mongoose  = require("mongoose");
const dotenv = require("dotenv");
const pinRoute = require("./routes/pins");
const userRoute = require("./routes/users");

const app = express();
dotenv.config();

app.use(express.json());

/* Routes */

app.use("/api/pins/",pinRoute);
app.use("/api/users/",userRoute);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
});

/* MONGO DB Connectivity */
const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => 
        console.log("Database connected Successfully!!")
    ).catch((err) => console.log(err));


app.listen(port, () => {
    console.log(`Server up and running on port : ${port}`);
});