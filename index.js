import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/dbConnect.js";
import userRoutes from "./routers/userRoutes.js";
import authenticate from "./middlewares/auth.js";

const app = express();

dotenv.config();
app.use(express.json());

dbConnect();

app.use(cors());

app.use("/users", userRoutes);

app.get("/free-route", (req, res) => {
  res.json({ message: "You are free to access this route anytime" });
});

app.get("/protected-route", authenticate, (req, res) => {
  res.json({
    message: "You are authorized to access this route",
    user: req.user,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
