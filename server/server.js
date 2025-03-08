import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from 'cors'
import colors from 'colors'
import morgan from "morgan"
import axios from 'axios';
import route from "./routes/projectRouter.js"

// dotenv
dotenv.config()

//REST object
const app = express()

//middlewares

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(bodyParser.json())

// routes
app.get('',(req,res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to full stack app tejas"
    });
});



const PORT = process.env.PORT || 8080;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
        .then(() => {
            console.log("db connected successfully..")
            app.listen(PORT, () => {
                console.log(`server is running on port: ${PORT}`)
            });
        })
        .catch((error) => console.log(error));

        app.use("/api", route)