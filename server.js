const express = require('express');
const app = express();
const PORT = 3000;



// index
app.get('/', (req, res) => {
    res.json('Lista dei post');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

