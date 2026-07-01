import mongoose from "mongoose";

mongoose
  .connect("mongodb://127.0.0.1:27017/Student-Managmenet-System").then(() => {
    console.log("You are connected to database Successfully");
  }).catch((e) => {
    console.log("Connection to database failed", e);
  });
