import mongoose from "mongoose";

export const connectDb = (DB_URI: string) => {
  mongoose
    .connect(DB_URI)
    .then(() => {
      console.log("Database is Connected");
    })
    .catch((error) => {
      console.log("---Database Connection Error");
      console.log(error);
    });
};
