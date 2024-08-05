import { Schema, model } from "mongoose";

// Declare the Schema of the Mongo model
let tempSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  otp: String,
  createdAt: { 
    type: Date,
    expires: "15m",
    default: Date.now,
    select: false
   },
});

//Export the model
export const Temp = model("temp", tempSchema);



