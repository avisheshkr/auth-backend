import mongoose from "mongoose";

const dbConnect = async () =>
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("Database connection established"))
    .catch((err) => {
      console.log("Unable to connect to MongoDB");
      console.error(err);
    });

export default dbConnect;
