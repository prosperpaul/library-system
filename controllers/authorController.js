const Author = require("../models/Author");
const Book = require("../models/Book");

// Create author
const createAuthor = async (req, res) => {
  try {
    const author = await Author.create(req.body);
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all authors
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single author
const getAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update author
const updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete author
const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) return res.status(404).json({ message: "Author not found" });

    const bookCount = await Book.countDocuments({ authors: req.params.id });
    if (bookCount > 0) {
      return res.status(400).json({ message: `Cannot delete author. They are linked to ${bookCount} book(s).` });
    }

    await author.deleteOne();
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createAuthor, getAuthors, getAuthor, updateAuthor, deleteAuthor };