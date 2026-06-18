import express, { json } from "express";
import "./db/mongoose.js";
import { router as userRouter } from "./router/user.js";
import { router as taskRouter } from "./router/task.js";

const app = express();
const port = process.env.PORT || 3000;

// app.use((req,res,next) => {
//   if(req.method === "GET") {
//     res.send("Get is disabled");
//   } else {
//     next();
//   }
// })

// app.use((req,res,next) => {
//   res.status(503).send("Site is currently down. Check back soon!")
// })

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("the app is listening to the port of " + port);
});



