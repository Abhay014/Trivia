// requiring packages

const express = require("express");

const path = require("path");

const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const fileUpload = require("express-fileupload");
const triviaRoute = require("./routes/trivia");
const jwt = require("jsonwebtoken");


const app = express();

const dotenv = require("dotenv");
dotenv.config();
const mongodb_url = process.env.MONGODB_URL;

app.use(cors());
app.use(passport.initialize());


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json({ extended: true }));



// home route

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/trivia", triviaRoute);

// connecting mongoose with mongodb
mongoose.set("strictQuery", true);

mongoose.connect(
  `${mongodb_url}`
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false
);


//checking for conformation of connectivity for database

const db = mongoose.connection;
db.on(
  "error",
  console.error.bind(
    console,
    "connection error:****************************************************"
  )
);
db.on("open", () => {
  console.log("database connected!!");
});



const PORT = 8004;

app.listen(PORT, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  } else console.log("Error occurred, server can't start", error);
});
