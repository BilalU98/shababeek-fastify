import mongoose from "mongoose";
import { databaseConfigration } from "config/database";

export const connectToDatabase = async () => {
  //   const OPTONS = {
  //     useNewUrlParser: true,
  //     useUnifiedTopology: false,
  //   };
  try {
    await mongoose.connect(databaseConfigration.host);
    console.log("data base is connected");
  } catch (e) {
    console.log({ error: e });
  }
};
