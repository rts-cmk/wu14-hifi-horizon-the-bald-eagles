// server.js
import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // Import the new route file
import cors from 'cors';

// Connect to the database
connectDB();

const app = express();

app.use(cors());

app.get('/test-200', (req, res) => {
    console.log('--- TEST ROUTE HIT (200 OK) ---');
    // If the server can reach this line, the problem is not CORS or a basic OS block.
    res.status(200).json({ status: 'OK', message: 'Local test succeeded!' });
});

app.get('/', (req, res) => {
    res.send('/api/products/', productRoutes);
});

// --- Middleware to handle JSON body parsing (important for POST requests later) ---
app.use(express.json()); 

// --- Use the API Route ---
app.use('/api/products', productRoutes); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));