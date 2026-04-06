// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const cors = require("cors");

// dotenv.config();
// connectDB();

// const app = express();
// app.use(cors({ origin: "https://library-management-system-5.vercel.app/" }));

// app.use(cors({
//   origin: frontendURL,
//   credentials: true, // allows cookies/auth headers
// }));


// // Routes
// app.use("/auth", require("./routes/authRoutes"));
// app.use("/authors", require("./routes/authorRoutes"));
// app.use("/books", require("./routes/bookRoutes"));
// app.use("/students", require("./routes/studentRoutes"));
// app.use("/attendants", require("./routes/attendantRoutes"));

// app.get("/", (req, res) => {
//   res.send("Library System API is running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();

// Allowed origins (frontend URLs)
const allowedOrigins = [
  "http://localhost:3000",                  // local frontend
  "https://library-management-system-5.vercel.app" // hosted frontend
];

// CORS setup
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true); // allow mobile apps, curl
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/authors", require("./routes/authorRoutes"));
app.use("/books", require("./routes/bookRoutes"));
app.use("/students", require("./routes/studentRoutes"));
app.use("/attendants", require("./routes/attendantRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("Library System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});