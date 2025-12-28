const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/calculatorDB')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Routes
const calculationRoutes = require('./routes/calculationRoutes');
app.use('/api/calculations', calculationRoutes);

// Server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
