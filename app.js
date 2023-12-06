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
 
app.listen(3000, ()=> console.log('Server running at port 3000'));