import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use('/saysco-api', router);

app.get("/", (req, res) => {
    console.log("Response success.")
    res.status(200).json({message: 'Response success!'});
});

app.listen(process.env.port || 8080, () => {
    console.log(`Server running at ${process.env.APP_URL || 'http://localhost'}:${process.env.PORT || 8080}/`)
});