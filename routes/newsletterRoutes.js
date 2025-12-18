import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('--- NEWSLETTER SUBSCRIPTION RECEIVED ---');
    try {
        const subscriber = new Newsletter({ email: req.body.email });
        await subscriber.save();
        res.status(201).json({ message: 'Subscription successful!' });
    } catch (err) {
        if (err.code === 11000) return res.status(400).json({ message: 'This email is already subscribed.' });
        res.status(500).json({ message: 'Subscription failed.' });

    }
});

export default router