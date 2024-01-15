const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json('test ok3');
})

app.post('/api/transaction', (req, res) => {
    res.json(req.body);
})

const PORT = 4000; // port 4000 for our backend
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});