import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongo from "./db/connectToMongo.js";
import bookRoutes from "./routes/bookRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware to enable CORS
app.use(cors());
// Middleware to parse JSON data
app.use(express.json());

// Available Routes
app.use("/api/books", bookRoutes);

// Define PORT
const PORT = process.env.PORT || 5001;

// Start the server
app.listen(PORT, () => {
  connectToMongo();
  console.log(`Server is running on port ${PORT}`);
});
