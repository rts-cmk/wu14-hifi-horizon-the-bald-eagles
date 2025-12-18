// routes/productRoutes.js
import express from 'express';
import Product from '../models/Product.js'; 

const router = express.Router();

router.get('/random', async (req, res) => {
    console.log('--- RANDOM PRODUCT ROUTE HIT ---');
    try {
        const catalog = await Product.findOne({});
        res.json(catalog);
    } catch (err) {
        res.status(500).json({ message: 'Server error ran into a problem while fetching products', error: err})
    }
});

router.get('/', async (req, res) => {
    console.log('--- PODUCT ROUTE HIT ---');
    try {
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

export default router;