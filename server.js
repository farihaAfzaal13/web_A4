// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Changed port to avoid conflict with React

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a simple model
const Item = mongoose.model('Item', {
    name: String
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', async (req, res) => {
    const newItem = new Item({ name: req.body.name });
    await newItem.save();
    res.json(newItem);
});

app.delete('/items/:id', async (req, res) => {
    const itemId = req.params.id;
    await Item.findByIdAndDelete(itemId);
    res.json({ success: true });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
