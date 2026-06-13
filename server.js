const express = require('express');
const app = express();
const PORT = 3000;
const postsRouter = require('./routes/posts');


const posts = require('./data/posts');
// index
app.get('/', (req, res) => {
    res.json('Hello world');
});

app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

