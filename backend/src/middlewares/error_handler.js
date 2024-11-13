import mongoose from "mongoose";


export class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}

const errorhandler = (err, req, res, next) => {
  // mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    console.log("mongoose class error", err)
    return res.status(400).send(err.message);
  }

  // custom errors
  if (err instanceof ApplicationError) {
    return res.status(err.code).send({message: err.message});
  }

  // server errors.
  console.log(err);
  res.status(500).send("Something went wrong, please try later");
};


export default errorhandler