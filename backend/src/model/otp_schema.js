import mongoose from "mongoose";
import { Schema } from "mongoose";

// Declare the Schema of the Mongo model
let otpSchema = new Schema({
    otp : String,
    email: {
        type: String,
        unique: true
    },
    createdAt: { type: Date, expires: '1m', default: Date.now }
});

//Export the model
export const Otp = mongoose.model('otps', otpSchema);
