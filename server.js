// server.js
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // Import the new route file

// Connect to the database
connectDB();

const app = express();

// --- Middleware to handle JSON body parsing (important for POST requests later) ---
app.use(express.json()); 

// --- Use the API Route ---
// Any request to '/api/products' will be handled by the productRoutes
app.use('/api/products', productRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));