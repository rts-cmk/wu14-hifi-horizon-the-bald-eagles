import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
    console.log('--- USER REGISTRATION ROUTE HIT ---');
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ message: 'New User has been created, HURRAY!'});
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'This user or mail is already been used.'});
        }
        res.status(400).json({ message: err.message})
    }
});

export default router;