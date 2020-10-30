const express = require('express')
const app = express();
const path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send('Inside the root of the app')
})

app.listen(8080, () => {
    console.log("APP is served on port 8080!!!")
})