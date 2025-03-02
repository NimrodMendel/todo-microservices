import mongoose from "mongoose";
import { Config } from "./config";

export const connectToDb = async () => {
  try {
    await mongoose.connect(Config.db_uri);
    console.log("Connected to database 🟢");
  } catch (error) {
    console.log("Unable to connect to database! ❌");
    console.error(error);
  }
};
