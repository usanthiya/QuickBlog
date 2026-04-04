import mongoose from "mongoose";
import { MONGODB_URI } from "./env.js";

const connectDb = async () => {
    try{
        mongoose.connection.on('connected', () => {
            console.log("Connected to database");
        })
        await mongoose.connect(MONGODB_URI);
    }catch(error){
        console.log("Error connecting to database", error.message);
        process.exit(1);
    }
}

export default connectDb;