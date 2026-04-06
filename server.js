const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: "https://library-management-system-5.vercel.app/" }));
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/authors", require("./routes/authorRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendants", require("./routes/attendantRoutes"));

app.get("/", (req, res) => {
  res.send("Library System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});