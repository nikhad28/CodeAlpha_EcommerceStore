const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Product = require('../models/Product');

let carts = {};

router.get('/', auth, (req, res) => {
  try {
    const cart = carts[req.user.id] || { items: [], total: 0 };
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/add', auth, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!carts[req.user.id]) {
      carts[req.user.id] = { items: [], total: 0 };
    }

    const cart = carts[req.user.id];
    const existingItem = cart.items.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update', auth, (req, res) => {
  try {
    const { productId, quantity } = req.body;
    
    if (!carts[req.user.id]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = carts[req.user.id];
    const item = cart.items.find(item => item.productId === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(item => item.productId !== productId);
    } else {
      item.quantity = quantity;
    }

    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/remove/:productId', auth, (req, res) => {
  try {
    if (!carts[req.user.id]) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const cart = carts[req.user.id];
    cart.items = cart.items.filter(item => item.productId !== req.params.productId);
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/clear', auth, (req, res) => {
  try {
    delete carts[req.user.id];
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
