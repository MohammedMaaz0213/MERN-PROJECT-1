import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import postsRouter from "./routes/posts.js";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postsRouter);
app.use("/users", userRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;

const PORT = process.env.PORT || 5000;
mongoose.set("strictQuery", true);

mongoose.connect(CONNECTION_URL).then(console.log("connected"));

app.listen(PORT, () => {
  console.log("Server is rinnung");
});
