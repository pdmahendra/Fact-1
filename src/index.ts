import express from "express";
import connectToDb from "./db/ConnectToDb.js";
import "dotenv/config";
import authRouter from "./routes/AuthRouter.js";
import TodoRouter from "./routes/TodoRouter.js";
import authenticate from "./middleware/authentication.js";

import cors from "cors";

console.log(process.env.MONGO_URL);


const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRouter);
app.use("/todo",authenticate, TodoRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Fact-1 Api");
});

app.listen(process.env.PORT as string, () => {
  try {
    connectToDb(process.env.MONGO_URL as string);
    console.log(`Listening on port ${process.env.PORT}`);
  } catch (error) {
    console.log("Error connecting to the database: ", error);
  }
});
