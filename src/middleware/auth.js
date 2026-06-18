// import jwt from "jsonwebtoken";
// import "../db/mongoose.js"
// import { User } from "../model/student.js";

// export const auth = async (req, res, next) => {
//   try {
//     const token = req.header("Authorization").replace("Bearer ","");

//     const decoded = jwt.verify(token,"jwttoken");

//     const user = await User.findOne({_id: decoded._id,"tokens.token": token});

//     if (!user) {
//       throw new Error();
//     }

//     req.user = user
//     req.token = token
//     next();

//   } catch (e) {
//     res.status(401).send({
//       error: "Please authenticate"
//     });
//   }
// };

import jwt from "jsonwebtoken";
import { User } from "../model/student.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    const decoded = jwt.verify(token, "amil");
    console.log(decoded);
    const user = await User.findOne({ _id: decoded._id });
    console.log(user);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ Error: "Please authenticate" });
  }
};
