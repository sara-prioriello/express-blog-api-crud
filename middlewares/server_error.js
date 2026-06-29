const server_error = (err, req, res, next) => {

    res.status(500).json({ error: 'Something went wrong!' });
}

module.exports = server_error;