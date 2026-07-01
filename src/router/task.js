import express from "express";
import { Task } from "../model/task.js";

export const router = new express.Router();

router.post("/tasks", async (req, res) => {
  try {
    const tasks = new Task(req.body);
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});

router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
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

router.patch("/tasks/:id", async (req, res) => {
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
    const task = await Task.findById(req.params.id);
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
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
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
