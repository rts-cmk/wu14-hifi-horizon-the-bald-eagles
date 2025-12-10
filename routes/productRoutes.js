// routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js'; // Import your model

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Query MongoDB using the Product model
        const products = await Product.find({}); 
        // Send the data back as JSON
        res.json(products); 
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;