
require("dotenv").config();
const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const connectDB  = require("./config/mongodb")
connectDB();



const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

// Add frontend URLS here to access the Backend 
const allowedOrigins = ['http://localhost:5173']
app.use(cors({origin: allowedOrigins,credentials:true}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


app.listen(port, ()=>{
    console.log("Server started")
})


// API EndPoints
app.get("/", (req,res)=>{
    res.send("Api working")
})

// this creates /api/auth/register and same for others
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)





