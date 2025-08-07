# 📝 Todo App (Backend)

A secure backend API for a Todo App with user authentication, task management, task rating, and MongoDB aggregation.

---

## 🚀 Features

- 🔐 User registration & login with JWT
- 🔒 Password hashing using bcrypt
- ✅ Create, update, delete tasks
- ⭐ Rate tasks
- 📊 Get task stats using MongoDB Aggregation
- 🔐 All task routes are protected using JWT middleware

---

## 🧠 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment config

---

## 📁 Folder Structure

todo-app-backend/
│
├── controllers/ # Logic for auth & tasks
├── middleware/ # JWT auth middleware
├── models/ # Mongoose schemas
├── routes/ # API routes
├── config/ # MongoDB connection
├── .env # Environment variables
├── server.js # Entry point
└── package.json


---

## ⚙️ Installation & Setup

git clone https://github.com/YOUR_USERNAME/todo-app-backend.git
cd todo-app-backend
npm install

Create .env file:
MONGO_URI=mongodb://localhost:27017/todo-app
JWT_SECRET=your_secret_key

Start the server:
npm run dev

Authentication Routes
POST /api/auth/register
{ "name": "Amit", "email": "amit@example.com", "password": "secret123" }

POST /api/auth/login
{ "email": "amit@example.com", "password": "secret123" }

Returns:
{ "token": "<JWT-token>" }
Use token in headers:
Authorization: Bearer <JWT-token>

Task Routes
GET /api/tasks POST /api/tasks PUT /api/tasks/:id DELETE /api/tasks/:id

POST /api/tasks/:id/rate # List all tasks
{ "title": "Learn MongoDB" }
{ "done": true }
{ "rating": 5 }

📊 Aggregation Endpoint
GET /api/tasks/stats
Returns:
{
  "totalTasks": 3,
  "completedTasks": 2,
  "averageRating": 4.5
}

🧪 Testing
Use Postman or curl to test endpoints.
Make sure MongoDB is running locally.

📜 License
MIT — feel free to use, fork, or improve!

Made by Amit Meena
---

## ✅ Final Steps

- Copy that into `README.md`
- `git add README.md`
- `git commit -m "Add project README"`
- `git push`
