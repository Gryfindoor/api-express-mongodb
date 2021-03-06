const ErrorRessponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
  };
  error.message = err.message;

  //Mongose bad ObjectId
  console.log(err.name);
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorRessponse(message, 404);
  }
  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered`;
    error = new ErrorRessponse(message, 400);
  }

  //Mongoose validation error
  if(err.name === "ValidationError"){
    const message = Object.values(err.errors).map(val => val.message);
    error = new ErrorRessponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    status: false,
    error: error.message || "Server error",
  });
};

module.exports = errorHandler;
