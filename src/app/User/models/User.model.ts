import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { IUser } from "../types/UserType";
const saltRounds = 12;
const { Schema, model } = mongoose;

interface IUserMethods {
  correctPassword: (password: string, hashed: string) => boolean;
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
  },

  lastName: {
    type: String,
  },

  password: {
    type: String,
  },

  photo: String,

  totalRating: {
    type: Number,
    default: 1,
  },

  rating: {
    type: Number,
    default: 5,
  },

  categories: {
    type: [String],
  },

  active: {
    type: Boolean,
    default: true,
  },

  phone: {
    type: String,
    unique: true,
  },

  rule: {
    type: String,
    enum: ["user", "admin", "superAdmin"],
    default: "user",
  },

  isWorker: {
    type: Boolean,
    default: false,
  },

  address: {
    type: String,
    // required: ["address is required !"],
  },

  birthOfDate: {
    type: Date,
    // required: ["birthOfDate is required !"],
  },

  location: {
    type: { type: String },
    coordinates: [Number],
  },

  subscriptionDate: {
    type: Date,
  },

  experience: {
    type: String,
    default: "1",
  },
});

userSchema.index({ location: "2dsphere" });

userSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, saltRounds);

    return next();
  } catch (err: any) {
    return next(err);
  }
});

userSchema.method(
  "correctPassword",
  async function (password: any, hashed: string) {
    let match = await bcrypt.compare(password, hashed);
    console.log({ match });
    return match;
  }
);

const User = model<IUser, UserModel>("User", userSchema);

export default User;
