// Required packages to run project backend
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');


// initialize express
const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// App Middleware usages
app.use(express.json());

// Imported routes
const authRoute = require("./routes/auth");
const blogRoute = require("./routes/blogs");

// Defined routes
app.use("/api/auth", authRoute);
app.use("/api", blogRoute);

// App Strings
const dbURI = "mongodb+srv://kareembar:U0jALlbuvND49U5n@cluster0.0vg6d.mongodb.net/Blog?retryWrites=true&w=majority";

// Database connection

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("DB started successfully");
});

app.listen(2400, () => {
  console.log("Server Started at port 2400");
});
