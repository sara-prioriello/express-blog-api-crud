function log_request(req, res, next) {

    console.log(`[${new Date().toISOString()}] ${req.method} - ${req.url} - ${req.ip}`);
    next();
}

module.exports = log_request;