const mongoose= require("mongoose");

async function connectDB() {
    mongoose.connection.on("connected", ()=>{
        console.log("Connected to DB");
    })
    await mongoose.connect(`${process.env.MONGODB_URL}/auth`)
    
}

module.exports = connectDB;