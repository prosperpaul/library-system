const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Author = require("./models/Author");
const Book = require("./models/Book");

dotenv.config();

const authorsData = [
  { name: "Chinua Achebe", bio: "Nigerian novelist, poet, and critic" },
  { name: "Chimamanda Ngozi Adichie", bio: "Nigerian writer of novels and short stories" },
  { name: "Wole Soyinka", bio: "Nigerian playwright and Nobel laureate" },
  { name: "George Orwell", bio: "English novelist and essayist" },
  { name: "J.K. Rowling", bio: "British author, creator of Harry Potter" },
  { name: "J.R.R. Tolkien", bio: "English author of fantasy literature" },
  { name: "Harper Lee", bio: "American novelist" },
  { name: "F. Scott Fitzgerald", bio: "American novelist of the Jazz Age" },
  { name: "Jane Austen", bio: "English novelist" },
  { name: "Mark Twain", bio: "American writer and humorist" },
  { name: "Ernest Hemingway", bio: "American novelist and journalist" },
  { name: "Gabriel García Márquez", bio: "Colombian novelist, Nobel laureate" },
];

const seedData = async () => {
  try {
    await connectDB();
    console.log("Connected to database...");

    await Author.deleteMany();
    await Book.deleteMany();
    console.log("Cleared existing authors and books");

    const authors = await Author.insertMany(authorsData);
    console.log(`Inserted ${authors.length} authors`);

    const byName = (name) => authors.find((a) => a.name === name)._id;

    const booksData = [
      { title: "Things Fall Apart", isbn: "978-0385474542", authors: [byName("Chinua Achebe")] },
      { title: "No Longer at Ease", isbn: "978-0385474559", authors: [byName("Chinua Achebe")] },
      { title: "Arrow of God", isbn: "978-0385014809", authors: [byName("Chinua Achebe")] },
      { title: "Purple Hibiscus", isbn: "978-1616202415", authors: [byName("Chimamanda Ngozi Adichie")] },
      { title: "Half of a Yellow Sun", isbn: "978-1400095209", authors: [byName("Chimamanda Ngozi Adichie")] },
      { title: "Americanah", isbn: "978-0307455925", authors: [byName("Chimamanda Ngozi Adichie")] },
      { title: "Death and the King's Horseman", isbn: "978-0393977615", authors: [byName("Wole Soyinka")] },
      { title: "The Lion and the Jewel", isbn: "978-0199110827", authors: [byName("Wole Soyinka")] },
      { title: "1984", isbn: "978-0451524935", authors: [byName("George Orwell")] },
      { title: "Animal Farm", isbn: "978-0451526342", authors: [byName("George Orwell")] },
      { title: "Harry Potter and the Philosopher's Stone", isbn: "978-0747532699", authors: [byName("J.K. Rowling")] },
      { title: "Harry Potter and the Chamber of Secrets", isbn: "978-0747538493", authors: [byName("J.K. Rowling")] },
      { title: "Harry Potter and the Prisoner of Azkaban", isbn: "978-0747542155", authors: [byName("J.K. Rowling")] },
      { title: "The Hobbit", isbn: "978-0547928227", authors: [byName("J.R.R. Tolkien")] },
      { title: "The Lord of the Rings", isbn: "978-0544003415", authors: [byName("J.R.R. Tolkien")] },
      { title: "To Kill a Mockingbird", isbn: "978-0061120084", authors: [byName("Harper Lee")] },
      { title: "The Great Gatsby", isbn: "978-0743273565", authors: [byName("F. Scott Fitzgerald")] },
      { title: "Pride and Prejudice", isbn: "978-0141439518", authors: [byName("Jane Austen")] },
      { title: "Sense and Sensibility", isbn: "978-0141439662", authors: [byName("Jane Austen")] },
      { title: "The Adventures of Tom Sawyer", isbn: "978-0486400778", authors: [byName("Mark Twain")] },
      { title: "Adventures of Huckleberry Finn", isbn: "978-0486280615", authors: [byName("Mark Twain")] },
      { title: "The Old Man and the Sea", isbn: "978-0684801223", authors: [byName("Ernest Hemingway")] },
      { title: "A Farewell to Arms", isbn: "978-0684801469", authors: [byName("Ernest Hemingway")] },
      { title: "One Hundred Years of Solitude", isbn: "978-0060883287", authors: [byName("Gabriel García Márquez")] },
      { title: "Love in the Time of Cholera", isbn: "978-0307389732", authors: [byName("Gabriel García Márquez")] },
    ];

    const books = await Book.insertMany(booksData);
    console.log(`Inserted ${books.length} books`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
