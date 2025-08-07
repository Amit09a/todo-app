require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is working 🚀');
});

// ✅ Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

// ✅ MongoDB Connection & Start Server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(3000, () => console.log('✅ Server is running on port 3000'));
  })
  .catch(err => console.log('❌ MongoDB connection error:', err));
