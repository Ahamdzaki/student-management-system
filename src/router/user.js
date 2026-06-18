import express from "express";
import { User } from "../model/student.js";
import { auth } from "../middleware/auth.js";


export const router = new express.Router();

// Create User or sign up
router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user,token});
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

//login users

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
  const token = await user.generateAuthToken();
    res.status(200).send({user,token});
  } catch (e) {
    res.status(400).send({ Error: e.message });
  }
});

// Get All Users
router.get("/users/me",auth, async (req, res) => {
  res.send(req.user);
  // try {
  //   const users = await User.find({});

  //   res.status(200).send(users);
  // } catch (e) {
  //   res.status(500).send({
  //     error: e.message,
  //   });
  // }
});

// Get User By ID
router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

// Update User

router.patch("/users/:id", async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  try {
    //const user = await User.findByIdAndUpdate(_id,req.body,{new: true,runValidators:true})
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

// Delete User
router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findByIdAndDelete(_id);

    if (!user) {
      return res.status(404).send({
        error: "User not found",
      });
    }

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});
