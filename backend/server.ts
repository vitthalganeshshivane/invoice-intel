import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import path from "node:path";

const app = express();

//Middleware to hanlde cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//middleware
app.use(express.json());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on the port ${port}`);
});
