import express from "express";
import { User } from "../model/student.js";
import { auth } from "../middleware/auth.js";

export const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.status(200).send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates",
    });
  }
  try {
   
    
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    // Use deleteOne() instead of remove()
    await req.user.deleteOne();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send({
      error: e.message
    })
  }
})



// router.get("/users/me",auth, async (req, res) => {
//   res.status(200).send(req.user);
//   // try {
//   //   const users = await User.find({});
//   //   res.status(200).send(users);
//   // } catch (e) {
//   //   res.status(500).send({
//   //     error: e.message,
//   //   });
//   // }
// });

// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send({
//         error: "User not found",
//       });
//     }

//     res.status(200).send(user);
//   } catch (e) {
//     res.status(400).send({
//       error: "Invalid user ID",
//     });
//   }
// });

// router.patch("/users/:id", async (req, res) => {
//   const updates = Object.keys(req.body);
//   const allowedUpdates = ["name", "email", "password"];
//   const isValidOperation = updates.every((update) =>
//     allowedUpdates.includes(update),
//   );

//   if (!isValidOperation) {
//     return res.status(400).send({
//       error: "Invalid updates",
//     });
//   }
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send({
//         error: "User not found",
//       });
//     }
//     updates.forEach((update) => {
//       user[update] = req.body[update];
//     });
//     await user.save();
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send({
//       error: e.message,
//     });
//   }
// });


// router.delete("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       return res.status(404).send({
//         error: "User not found",
//       });
//     }
//     res.status(200).send(user);
//   } catch (e) {
//     res.status(500).send({
//       error: e.message,
//     });
//   }
// });
