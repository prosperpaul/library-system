
# 📚 School Library Management API

A RESTful API for managing a school library system built with Node.js, Express.js, and MongoDB.

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication
- Express Validator


## 📁 Project Structure

```
/library-system
  /models
    Author.js
    Book.js
    Student.js
    LibraryAttendant.js
    User.js
  /controllers
    authorController.js
    bookController.js
    studentController.js
    attendantController.js
    authController.js
  /routes
    authorRoutes.js
    bookRoutes.js
    studentRoutes.js
    attendantRoutes.js
    authRoutes.js
  /middleware
    auth.js
    validate.js
  /config
    db.js
  server.js
  .env
```

## ⚙️ Setup Steps

1. Clone the repository:
```
git clone https://github.com/prosperpaul/library-system.git
```

2. Navigate into the project:
```
cd library-system
```

3. Install dependencies:
```
npm install
```

4. Create a `.env` file in the root and add:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

5. Run the server:
```
npm run dev
```

## 🔐 Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /auth/register | Register a new user |
| POST | /auth/login | Login and get token |

## ✍️ Author Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /authors | Create an author |
| GET | /authors | Get all authors |
| GET | /authors/:id | Get single author |
| PUT | /authors/:id | Update author |
| DELETE | /authors/:id | Delete author |

## 📖 Book Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /books | Create a book |
| GET | /books | Get all books (supports ?page=1&limit=10&search=title) |
| GET | /books/:id | Get single book |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |
| GET | /books/overdue | Get all overdue books |
| POST | /books/:id/borrow | Borrow a book |
| POST | /books/:id/return | Return a book |

## 🎓 Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /students | Create a student |
| GET | /students | Get all students |
| GET | /students/:id | Get single student |

## 👩‍💼 Library Attendant Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /attendants | Create an attendant |
| GET | /attendants | Get all attendants |

## 📤 Borrow a Book

**POST** `/books/:id/borrow`

Request body:
```json
{
  "studentId": "student_id_here",
  "attendantId": "attendant_id_here",
  "returnDate": "2026-04-30"
}
```

## 📥 Return a Book

**POST** `/books/:id/return`

No request body needed.

## ✅ other Features

- Pagination & Search on GET /books
- Validation via middleware
- Overdue books check
- JWT Authentication
- Duplicate ISBN prevention

## 👩‍💻 Author

Built by **Chiamaka Prosper Nkwazema** — TSAcademy Backend Development Phoenix Cohort
```

