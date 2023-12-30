const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const { AdminSchema, UserSchema, CourseSchema } = require("../db/index.js")

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    UserSchema.create({ username: req.body.username, password: req.body.password })
    res.status(200).json({ message: 'User created successfully' })
});

router.post('/signin', (req, res) => {
    // Implement admin signin logic
    UserSchema.create({ username: req.body.username, password: req.body.password })
    const token = jwt.sign({ username: req.body.username, password: req.body.password }, jwtPassword);
    res.status(200).json({ token: token });
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    CourseSchema.find()
        .then(course => {
            res.json({ courses: course })
        })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    const response = await CourseSchema.find({ _id: courseId })
    if (!response) {
        return res.status(404).json({ message: 'Course not found' });
    }
    var user = await UserSchema.findOne({ username: username });
    if (user.coursesPurchased.includes(courseId)) {
        res.status(404).json({ message: 'Course already purchased' });
    }
    try {
        user.coursesPurchased.push(courseId);
        await user.save()
        res.status(200).json({ message: "Course purchased successfully" });
    }
    catch (err) {
        res.status(404).json({ message: 'something went wrong' });
    }

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    try {

        var user = await UIEvent.findOne({ username: username });
        return res.status(200).json({ message: user.coursesPurchased })
    }
    catch (err) {
        res.status(404).json({ message: 'something went wrong' });
    }
});

module.exports = router