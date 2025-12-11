// routes/productRoutes.js
import express from 'express';
// Assuming your model is imported as Product (which is mapped to 'Catalog' in your Product.js)
import Product from '../models/Product.js'; 

const router = express.Router();

router.get('/', async (req, res) => {
    console.log('--- API ROUTE HIT (Attempting DB Fetch) ---');
    try {
        // Find the single document and use .lean() for a plain JavaScript object
        const productDoc = await Product.findOne({}).lean(); 
        
        if (!productDoc) { 
            return res.status(404).json({ message: 'No catalog document found in DB' });
        }

        // 💡 THE FIX: The MongoDB document ITSELF is the data you need. 
        // We delete the Mongoose internal _id field and send the rest.
        delete productDoc._id; 

        // Send the entire object, which now contains your catalog data at the root
        res.json(productDoc); 
        
    } catch (error) {
        console.error('SERVER ERROR DURING DB FETCH:', error); 
        res.status(500).json({ message: 'Server error during database query' });
    }
});

export default router;