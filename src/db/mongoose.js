import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/Teachers-Management-System").then(() => {
    console.log("you are connected to database successfully");
  })
  .catch((e) => {
    console.log(e, "connection to database failed");
  });

