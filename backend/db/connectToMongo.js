import mongoose from "mongoose";

export default async function connectToMongo() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to MongoDB - ${conn.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}
