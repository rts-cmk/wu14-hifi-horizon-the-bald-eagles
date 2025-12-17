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

router.post('/login', async (req, res) => {
    console.log('--- USER LOGIN ROUTE HIT ---');
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'The mail or pasword do not match, try again'});
        }

        const { password: _, ...userData } = user._doc;
        res.status(200).json({ message: 'Login was successful!', user: userData});
    } catch (err) {
        res.status(500).json({ message: 'Server error when trying to login'});

        }

    });

router.put('/update/:id', async (req, res) => {
    console.log('--- USER UPDATE ROUTE HIT---');
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'Customer was not found'});
        }

        const { password: _, ...userData } = updatedUser._doc;
        res.json({ message: 'Profile has been updated!', user: userData });
    } catch (err) {
        res.status(500).json({ message: 'Server error when trying to update profile'});

    }
});

export default router;