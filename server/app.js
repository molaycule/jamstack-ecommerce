const products = require('./products.json'); 
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("Welcome to Tunlese's Ecommerce API v1.0");
});

app.get('/products', (req, res) => {
  res.status(200).send(products);
});

app.get('/product/:id', (req, res) => {
  try {
    const product = products.find(
      product => product.id === Number(req.params.id)
    );

    if (product === undefined) {
      throw new Error('Product with id ' + req.params.id + ' does not exist');
    }

    res.status(200).send(product);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

app.post('/product', (req, res) => {
  try {
    const product = req.body;
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.amountInStock
    ) {
      throw new Error(
        'Product must have name, description, price and amountInStock'
      );
    }

    product.id = products.length + 1;
    products.push(product);
    res.status(201).send('Product created successfully');
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
