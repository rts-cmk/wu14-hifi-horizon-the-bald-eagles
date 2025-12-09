import mongoose from 'mongoose';
import 'dotenv/config'; // Load environment variables from .env file

// Access the variable defined in your .env file
const MONGODB_URI = process.env.MONGO_URI; 

if (!MONGODB_URI) {
    // Safety check in case the URI is missing
    console.error("FATAL ERROR: MONGO_URI is not defined in .env");
    process.exit(1); 
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            // These options are now largely the defaults in recent Mongoose versions, 
            // but it's good practice to ensure they are handled.
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('MongoDB connection failed:', err.message);
        // Exit process with failure
        process.exit(1); 
    }
};

export default connectDB;