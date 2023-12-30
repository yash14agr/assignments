// Middleware for handling auth
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { AdminSchema, UserSchema, CourseSchema } = require("../db/index.js")

async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.Authorization
    token = token.split(' ')[1];
    const payload = jwt.verify(token, jwtPassword);
    const response = await AdminSchema.find({ username: payload.username, password: payload.password })
    if (!response) {
        return res.json({ message: 'Admin not found!' })
    }
    next();
}

module.exports = adminMiddleware;