const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { AdminSchema, UserSchema, CourseSchema } = require("../db/index.js")

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const token = req.headers.Authorization
    token = token.split(' ')[1];
    const payload = jwt.verify(token, jwtPassword);
    const response = await UserSchema.find({ username: payload.username, password: payload.password })
    if (!response) {
        return res.json({ message: 'User not found!' })
    }
    next();

}

module.exports = userMiddleware;