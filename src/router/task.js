import express from "express";
import { Task } from "../model/task.js";

export const router = express.Router();

//post tasks
router.post("/tasks", async (req, res) => {
  const tasks = new Task(req.body);

  try {
    await tasks.save();
    res.status(201).send(tasks);
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});

//get All tasks
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

//get one task
router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const tasks = await Task.findById({ _id });
    if (!tasks) {
      return res.status(404).send({ error: "tasks not found" });
    }
    res.status(200).send();
  } catch (e) {
    res.status(400).send({
      error: e.message,
    });
  }
});
//update task
router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid updates!",
    });
  }

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
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

//delete task

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete({ _id });
    if (!task) {
      return res.status(404).send({ error: "task not found" });
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send({
      error: e.message,
    });
  }
});
