require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT  || 5000;
const app = express();
const router = require("./routes/index");


app.use(express.json());



app.use("api", router);

const start = async () => {

    try{
        await mongoose.connect(process.env.DB_URL)
        
        app.listen(PORT, () => {
            console.log("Server has been started on port:", PORT)
        })
        
    } catch(e) {
        
    }
}

start()