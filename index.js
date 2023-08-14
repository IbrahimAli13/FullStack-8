const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");
mongoose
  .connect(
    "mongodb+srv://ibrahim:ibFA19041310@cluster0.qrrbu8u.mongodb.net/SomeData?retryWrites=true&w=majority",
  )
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("err");
  });

app.use(express.json());

app.get("/", async (req, res) => {
  const user = await UserModel.find();
  res.json(user);
});
app.post("/createuser", async (req, res) => {
  const user = req.body;

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = new UserModel({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
  res.json(user);
});
const bcrypt = require("bcrypt");

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username });

  if (user) {
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.send("Correct");
    } else {
      res.send("Incorrect");
    }
  } else {
    res.send("Incorrect");
  }
});

app.listen(3001, () => {
  console.log("server is working");
});
