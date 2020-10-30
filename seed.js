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

// const p = new Product({
//     name: 'Berry',
//     price: 6.33,
//     category: 'fruit'
// })

// p.save()
//     .then((res) => {
//         console.log(res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'veggies'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'veggies'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })

    