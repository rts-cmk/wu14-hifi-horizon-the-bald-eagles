import mongoose from 'mongoose';
import 'dotenv/config';


const MONGODB_URI = process.env.MONGO_URI; 

if (!MONGODB_URI) {
    
    console.error("FATAL ERROR: MONGO_URI is not defined in .env");
    process.exit(1); 
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {});
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        process.exit(1); 
    }
};

export default connectDB;