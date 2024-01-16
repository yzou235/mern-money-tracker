const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/transaction.js');
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok3');
})

app.post('/api/transaction', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL); // connect to database
    const {price, name, description, date} = req.body; // grab
    // put into database/transaction model
    const transaction = await Transaction.create({price, name, description, date});
    res.json(transaction);
})

app.get('/api/transactions', async(req, res) => {
    await mongoose.connect(process.env.MONGO_URL); 
    const transactions = await Transaction.find();
    res.json(transactions);
})



const PORT = 4000; // port 4000 for our backend
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// username: money
// password:
// H2GaVQYli0ozesDu