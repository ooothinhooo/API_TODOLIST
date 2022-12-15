import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import AuthMiddleware from "./middlewares/AuthMidleware.js";
import apiRoute, { apiProtected } from "./routes/api.js";
// import { DB_CONNECT } from "./utils/constants.js";
import path from "path";

const app = express();

const DBROOT = process.env.DBROOT;
const DBPASS = process.env.DBPASS;
const DBNAME = process.env.DBNAME;

// database connection
mongoose.set({ strictQuery: true });
mongoose.connect(
  `mongodb+srv://Thinhne1504:Thinhne1504@cluster0.8r9hv.mongodb.net/MERN_TODOLIST?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => console.log("DB connection")
);

const PORT = 8000;
// const path = require("path");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.use("/api/", apiRoute);
app.use("/api/", AuthMiddleware, apiProtected);

app.get("/", (req, res) => {
  res.json("Server Todo List Run");
});
app.listen(PORT, () => console.log(`Server Run Port ${PORT}`));
