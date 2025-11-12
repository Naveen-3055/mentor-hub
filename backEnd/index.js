import express from "express"
import cors from 'cors'
import dotenv from "dotenv"
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(cookieParser())
app.use(cors({
        origin:["http://localhost:5173"],
        credentials:true
}))

app.get("/", (req,res)=>{
    res.send("server is running...")
}
)
app.use("/api/auth",authRouter);

app.listen(PORT, async ()=>{
    await connectDb()
    console.log("server stated...")
})