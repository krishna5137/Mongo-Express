const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product');
const categories = ['fruit', 'veggies', 'dairy'];
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

mongoose.set('useFindAndModify', false); // Make Mongoose use `findOneAndUpdate()`

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride('_method')) // override with POST having ?_method=PUT

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category });
    } else {
        const products = await Product.find({});
        res.render('products/index', { products, category: 'All' });
    }
})

app.get('/products/add', (req, res) => {
    res.render('products/add', { categories })
})

app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    //console.log(product)
    res.render('products/edit', { product, categories })
})

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    //console.log(updateProduct);
    res.redirect(`/products/${updateProduct._id}`);
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    console.log(deletedProduct);
    res.redirect('/products')
})

app.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`)
})

app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/details', { product });
})

app.listen(8080, () => {
    console.log("APP LISTENING ON 8080!!!")
});