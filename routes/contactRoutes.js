import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

router.post('/', async (req, res) => {
    console.log('--- CONTACT MESSAGE RECEIVED ---');
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Your message has been saved to the database!' 
        });
    } catch (err) {
        console.error('Error saving message:', err);
        res.status(400).json({ 
            success: false, 
            message: 'Failed to send message.' 
        });
    }
});

export default router;