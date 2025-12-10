// models/Product.js (Schema Updates)

import mongoose from 'mongoose';

// 1. Define the schema for the detailed product info (Model level)
const productDetailSchema = mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    'in-stock': { type: Boolean, required: true },
    price: { type: Number, required: true },
    color: [{ type: String }], // Array of available colors
    specifications: { type: Map, of: String }, // Flexible Map for key/value specs
}, { _id: false }); // We don't need Mongoose to manage an ID for this sub-document

// 2. Define the schema for the Brand (Map of model names to product details)
const brandSchema = mongoose.Schema({
    // Using a Map for flexible keys (the model name strings)
    details: { type: Map, of: productDetailSchema } 
}, { _id: false });

// 3. Define the schema for the Category (Map of brand names to brands)
const categorySchema = mongoose.Schema({
    brands: { type: Map, of: brandSchema }
}, { _id: false });

// 4. Define the Master Catalog Schema (The single document)
const masterCatalogSchema = mongoose.Schema({
    product_data: { 
        type: Map, 
        of: categorySchema 
    }
}, {
    collection: 'products'
});

const Catalog = mongoose.model('Catalog', masterCatalogSchema);

export default Catalog;