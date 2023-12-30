const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const schemas = require("../db/index.js");
// const adminSchemas = schemas.Admin;
const courseSchemas = schemas.Course;
const userSchemas = schemas.User;

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new userSchemas({ username: username, password: password });
    newUser.save()
        .then(() => {
            res.status(201).json({ message: "User created successfully" });
        })
        .catch((err) => {
            console.log(err)
        });
});

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        var courseArray = await courseSchemas.find();
        // console.log(courseArray);
        res.status(200).json({ courses: courseArray });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    const response = await courseSchemas.find({ _id: courseId })
    if (!response) {
        return res.status(404).json({ message: 'Course not found' });
    }
    var user = await userSchemas.findOne({ username: username });
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

        var user = await userSchemas.findOne({ username: username });
        return res.status(200).json({ message: user.coursesPurchased })
    }
    catch (err) {
        res.status(404).json({ message: 'something went wrong' });
    }


});

module.exports = router