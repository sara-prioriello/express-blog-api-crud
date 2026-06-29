const express = require('express');
const app = express();
const PORT = 3000;
const postsRouter = require('./routes/posts');
const not_found = require('./middlewares/not_found');
const log_request = require('./middlewares/log_request');
const server_error = require('./middlewares/server_error');


const posts = require('./data/posts');

//registro body parser per application json
app.use(express.json());

//use the logRequest middleware for all routes
app.use(log_request);

// index
app.get('/', (req, res) => {
    res.json('Hello world');
});

app.use('/posts', postsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/error', (req, res) => {
    throw new Error('Test error');
});

// server error middlware 
app.use(server_error);

// 404 not found middleware
app.use(not_found);