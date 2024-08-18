import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

//Route to Save a new Book in the Database
router.post("/", async (req, res) => {
  try {
    if (
      !req.body.title ||
      !req.body.author ||
      !req.body.pageCount ||
      !req.body.publishYear
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      pageCount: req.body.pageCount,
      publishYear: req.body.publishYear,
    });

    const book = await Book.create(newBook);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to Fetch all Books from the Database
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to Fetch a single Book from the Database
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to Update a Book in the Database
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route to Delete a Book from the Database
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json("Book deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
