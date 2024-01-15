const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.json('test ok');
})

app.listen(4000); // port 4000 for our backend