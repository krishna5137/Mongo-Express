const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');


const Product = require('./models/product');
/**
 * Establish a connection with MongoDB
 */
mongoose.connect('mongodb://localhost:27017/farmInventory', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!')
    })
    .catch(err => {
        console.log('CONNECTION FAILURE')
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/products', async (req, res) => {
    const products = await Product.find({});
    res.render('products/index', { products });
})

app.get('/products/add', (req, res) => {
    res.render('products/add')
})

app.post('/products', async (req, res) => {
    const product = await new Product(req.body);
    product.save();
    res.redirect('/products')
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });
})

app.listen(8080, () => {
    console.log("APP LISTENING ON 8080!!!")
});