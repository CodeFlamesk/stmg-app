require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT  || 5000;
const app = express();
const router = require("./routes/index");
const fileUpload = require("express-fileupload");
const fileMiddleware = require("./middleware/filePath.middleware")
const corsMiddleware = require("./middleware/cors.middleware")
const path = require("path")



app.use(fileUpload({}))
app.use(corsMiddleware)
app.use(express.json());

app.use(express.static("static"))
app.use(fileMiddleware(path.resolve(__dirname, "static")));


app.use("/api", router);



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