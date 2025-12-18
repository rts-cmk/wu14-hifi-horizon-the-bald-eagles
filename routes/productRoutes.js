// routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('--- PODUCT ROUTE HIT (Attempting DB Fetch) ---');
    try {
        // Find the single document and use .lean() for a plain JavaScript object
        const productDoc = await Product.findOne({}).lean(); 
        
        if (!productDoc) { 
            return res.status(404).json({ message: 'No catalog document found in DB' });
        }

        delete productDoc._id; 
        res.json(productDoc); 
        
    } catch (error) {
        console.error('SERVER ERROR DURING DB FETCH:', error); 
        res.status(500).json({ message: 'Server error during database query' });
    }
});

router.get('/random', async (req, res) => {
    try {
        const randomProducts = await Product.aggregate([{ $sample: { size: 4 } }]);
        res.json(randomProducts);
    } catch (err) {
        res.status(500).json({ message: 'Server error ran into a problem while fetching products', error: err})
    }
});

export default router;