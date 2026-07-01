import { router as userRouter } from "./router/user.js";
import { router as taskRouter } from "./router/task.js";
import "./db/mongoose.js";
import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// // .use((req, res, next) => {
// // f(req.method === "GET") {
// //  res.status(500).send("GET Request is disabled")
// //  else {
// //  nexnext() // 
// // 

// app.use((req, res, next) => {
//   res.status(500).send("Site is currently down. Check back soon!");
// })

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`the app is listening on ${port}`);
});
