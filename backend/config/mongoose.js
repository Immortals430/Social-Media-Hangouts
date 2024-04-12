import mongoose from "mongoose";
const DB = process.env.DB;

// connect to mongodb 
export const connectDb = async () => {
    try{
        mongoose.connect(DB);
        console.log("Connected to MongoDB: " + DB);
    }
    catch(err){
        console.log('Something went wrong while connecting to MongoDb', err);
    }
}

