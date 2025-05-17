import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

export const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Mongodb error:",error);
        
    }
}