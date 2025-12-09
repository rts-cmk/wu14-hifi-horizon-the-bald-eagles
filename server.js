import express from 'express';
import connectDB from './config/db.js'; // Adjust path as necessary
// const productRoutes = require('./routes/products'); // Example route

// Connect to the database
connectDB();

const app = express();

// ... other middleware and server setup ...

// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));