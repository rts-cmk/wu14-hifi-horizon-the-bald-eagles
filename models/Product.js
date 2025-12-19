import mongoose from 'mongoose';


const productDetailSchema = mongoose.Schema({
    image: { type: String, required: true },
    description: { type: String, required: true },
    'in-stock': { type: Boolean, required: true },
    price: { type: Number, required: true },
    color: [{ type: String }], 
    specifications: { type: Map, of: String }, 
}, { _id: false }); 

const brandSchema = mongoose.Schema({

    details: { type: Map, of: productDetailSchema } 
}, { _id: false });

const categorySchema = mongoose.Schema({
    brands: { type: Map, of: brandSchema }
}, { _id: false });

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