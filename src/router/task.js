import express from "express";
import { Task } from "../model/task.js";
import { auth } from "../middleware/auth.js";

export const router = new express.Router();

router.post("/tasks",auth, async (req, res) => {
  try {
    // const tasks = new Task(req.body);
    const tasks = new Task( {
      ...req.body,
      owner: req.user._id
    })
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get("/tasks",auth, async (req, res) => {
  try {
    // const tasks = await Task.find({});
    // const tasks = await Task.find({owner: req.user._id});
     await req.user.populate("tasks");
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.get("/tasks/:id",auth, async (req, res) => {
  console.log(req.user._id);
  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
    console.log(task);
    if (!task) {
      return res.status(404).send({
        error: "Task not found",
      });
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );
  if (!isValidOperation) {
    return res.status(400).send({
      error: "invalid updates",
    });
  }

  try {
    // const task = await Task.findById(req.params.id);
    const task = await Task.findOne({_id: req.params.id, owner: req.user._id});

    if (!task) {
      return res.status(404).send({
        error: "task not found",
      });
    }
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});
router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    // const task = await Task.findByIdAndDelete(req.params.id);
    const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
    
    if (!task) {
      return res.status(404).send({
        error: "task not found",
      });
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});
