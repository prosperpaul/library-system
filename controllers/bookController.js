const Book = require("../models/Book");

// Create book
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all books
// const getBooks = async (req, res) => {
//   try {
//     const books = await Book.find().populate("authors");
//     res.status(200).json(books);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Get all books with pagination and search
const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";
    const query = search
      ? { title: { $regex: search, $options: "i" } }
      : {};

    const books = await Book.find(query)
      .populate("authors")
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(query);

    res.status(200).json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      books,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single book
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Borrow book
const borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "OUT") {
      return res.status(400).json({ message: "Book is already borrowed" });
    }

    const { studentId, attendantId, returnDate } = req.body;

    book.status = "OUT";
    book.borrowedBy = studentId;
    book.issuedBy = attendantId;
    book.returnDate = returnDate;

    await book.save();
    res.status(200).json({ message: "Book borrowed successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Return book
const returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (book.status === "IN") {
      return res.status(400).json({ message: "Book is already returned" });
    }

    book.status = "IN";
    book.borrowedBy = null;
    book.issuedBy = null;
    book.returnDate = null;

    await book.save();
    res.status(200).json({ message: "Book returned successfully", book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get overdue books
const getOverdueBooks = async (req, res) => {
  try {
    const today = new Date();
    const overdueBooks = await Book.find({
      status: "OUT",
      returnDate: { $lt: today },
    })
      .populate("authors")
      .populate("borrowedBy")
      .populate("issuedBy");

    res.status(200).json(overdueBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  createBook, 
  getBooks, 
  getBook, 
  updateBook, 
  deleteBook, 
  borrowBook, 
  returnBook,
  getOverdueBooks
};