require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const { MONGO_URI, PORT } = process.env;

const User = require("./models/users");
const userRouter = require("./router/userRouter");

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRouter);

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { users });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
