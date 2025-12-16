import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullName: { 
        type: String,
        required: [true, 'Full name is required'],
        trim: true 
    },
    address: { 
        type: String, 
        required: true, 
        default: "" 
    },
    address2: { 
        type: String, 
        default: "" 
    },
    zipCode: { 
        type: String, 
        required: true, 
        default: "" 
    },
    city: { 
        type: String, 
        required: true, 
        default: "" 
    },
    country: { 
        type: String, 
        default: "" 
    },
    phone: { 
        type: String, 
        default: "" 
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        lowercase: true,
        unique: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'] 
    }
});

const User = mongoose.model('User', userSchema);
export default User;