// Middleware for handling auth
const schemas = require("../db/index.js");
const adminSchemas = schemas.Admin;

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    var response = await adminSchemas.findOne({ username: username });
    if (response == null) {
        return res.status(404).json({ message: "Admin not found." })
    }
    if (password != response.password) {
        return res.status(401).json({ message: 'Wrong Password' });
    }
    next();
}

module.exports = adminMiddleware;