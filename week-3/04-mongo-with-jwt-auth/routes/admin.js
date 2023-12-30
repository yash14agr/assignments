const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { AdminSchema, UserSchema, CourseSchema } = require("../db/index.js")

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    var username = req.body.username
    var password = req.body.password

    const newAdmin = new AdminSchema({ username: username, password: password })
    try {
        await newAdmin.save()
        res.status(201).json({ message: 'Admin created successfully' })
    }
    catch (err) {
        res.status(404).json({ message: 'something went wrong' })
    }

});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.username
    try {

        const newAdmin = new AdminSchema({ username: username, password: password });
        var token = jwt.sign({ username: username, password: password }, jwtPassword);
        // token = 'Bearer ' + token
        return req.status(200).json({ token: token })
    }
    catch (err) {
        return res.status(404).json({ message: 'something went wrong!' });
    }

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const newCourse = new CourseSchema({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    newCourse.save()
        .then(() => {
            return res.status(200).json({ message: "Course created successfully", courseId: newCourse._id })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "something went wrong" });
        })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    CourseSchema.find()
        .then((course) => {
            res.status(200).json({ message: course });
        })
});

module.exports = router;