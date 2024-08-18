import express from "express";
import dotenv from "dotenv";
import connectToMongo from "./db/connectToMongo.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
