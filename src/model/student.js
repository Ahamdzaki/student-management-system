import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minlength: 7,
    },
    age: {
      type: Number,
      required: true,
      validate(value) {
        if (value < 18) {
          throw new Error("Age must be at least 18");
        }
      },
    },
    tokens : [{
      token : {
        type: String,
        required: true
      }
    }]
  },
  {
    timestamps: true,
  },
);

userSchema.methods.generateAuthToken = async function  () {
  const user = this;
  const token = await jwt.sign({_id:user._id.toString()},"amil");
  user.tokens = await user.tokens.concat({token});
  await user.save();
  return token
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Unable to login");
  }

  return user;
};

//before saving user in dataBase execute this function
//its says i am done with my pre save work. continue to save it
userSchema.pre("save", async function (next) {
  //this referes to doucments being saved
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

export const User = mongoose.model("User", userSchema);
