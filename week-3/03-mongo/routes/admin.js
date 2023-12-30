const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const schemas = require("../db/index.js");
const adminSchemas = schemas.Admin;
const courseSchemas = schemas.Course;
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new adminSchemas({ username: username, password: password });
    newUser.save()
        .then(() => {
            res.status(201).json({ message: "Admin created successfully" });
        })
        .catch((err) => {
            console.log(err)
        });

});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const obj = new courseSchemas({
        title: title,
        description: description,
        price: price,
        imageLink: imageLink
    })
    obj.save()
        .then(() => {
            return res.status(200).json({ message: "Course created successfully", courseId: obj._id })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "something went wrong" });
        })

});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    try {
        var courseArray = await courseSchemas.find();
        console.log(courseArray);
        res.status(200).json({ courses: courseArray });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }

});

module.exports = router;