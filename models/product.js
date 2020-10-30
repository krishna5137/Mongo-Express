const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * Define a schema
 */
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'veggies', 'dairy']
    }
})

/**
 * Make a Model
 */
const Product = mongoose.model('Product', productSchema);


module.exports = Product;