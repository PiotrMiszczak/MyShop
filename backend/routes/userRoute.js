import express from "express";
import User from "../models/userModel";
import { getToken } from "../util";
import bcrypt from "bcrypt";
import data from "../data";

const router = express.Router();

router.get("/sample", async (req, res) => {
  await User.remove({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdUsers });
});

router.post("/signin", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (user && bcrypt.compareSync(req.body.password, user.password) == true) {
    res.send({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      email: user.email,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    isAdmin: false,
  });
  const newUser = await user.save();
  if (newUser) {
    res.send({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(user),
    });
  } else {
    res.status(401).send({ message: "Invalid User Data." });
  }
});

export default router;
