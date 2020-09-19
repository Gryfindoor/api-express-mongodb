const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });;
const morgan = require("morgan");
const errorHandler = require("./middleware/error"); 
const connectDB = require("./config/db")();

const bootcamps = require("./routes/bootcamps.js");
const app = express();

app.use(express.json())

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/bootcamps", bootcamps);
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
