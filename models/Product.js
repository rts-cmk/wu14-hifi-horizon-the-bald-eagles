// models/Product.js
import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    // Add other fields as needed
}, {
    timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;