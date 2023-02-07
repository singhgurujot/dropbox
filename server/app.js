const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/routes");
const app = express();
const db = require("./config/db.js");

// Connecting to the database
mongoose.Promise = global.Promise;
mongoose.set('strictQuery', true);
mongoose.connect(db.database, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

// Initialize cors middleware
global.__basedir = __dirname;
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,Content-Type, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "*");
  next();
});


// Define a simple route
app.use('/images', express.static('uploads'));
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use("/", userRouter);

//* Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = 4000;
app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);