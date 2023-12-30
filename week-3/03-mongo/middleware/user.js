const schemas = require("../db/index.js");
const userSchemas = schemas.User;

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;

    const response = await userSchemas.findOne({ username: username });

    if (response == null) {
        res.status(404).json({ message: "user not found" });
    }
    if (response.password != password) {
        return res.status(401).json({ message: "invalid credentials" })
    }
    next();
}

module.exports = userMiddleware;