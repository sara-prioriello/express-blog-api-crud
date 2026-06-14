const express = require('express');
const app = express();
const PORT = 3000;
const postsRouter = require('./routes/posts');


const posts = require('./data/posts');

//registro body parser per application json
app.use(express.json());

app.post('/posts', (req, res) => {
    console.log(req.body);
    //in req.body troveremo i dati ricevuti
});
// index
app.get('/', (req, res) => {
    res.json('Hello world');
});

app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

