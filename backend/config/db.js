import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB= async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGO DB CONNECTED");

    }
    catch(error){
        console.error("MONGO DB CONNECTION ERROR:", error.error);
        process.exit(1);
    }
}

export default connectDB;