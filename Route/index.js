//Importing all the necessary librarys
const express = require("express");
const adminMiddleware = require("C:/Users/bisha/Desktop/Course web/Middleware/adminMiddleware");
const bodyparser = require("body-parser")

const { Admin, Course } = require("C:/Users/bisha/Desktop/Course web/Database/database");
const adminRouter = express.Router();

adminRouter.use(express.json()); 

adminRouter.get("/user", (req, res)=>{
    res.json({
        message: "Hello World"
    })
})

adminRouter.post("/signup",adminMiddleware, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
    await Admin.create({
        username: username,
        password: password
    })
    res.json({
        message: "Admin Created"
    })
});

adminRouter.post("/courses",adminMiddleware, async (req, res)=>{
    const title = req.body.title;
    const description = req.body.description;
    const imagelink = req.body.imagelink;
    const price = req.body.price;
    //Now according to assignment we have to show the course id for that we'll create a variable that'll store the created course
   const courseid = await Course.create({
        title: title,
        description: description,
        imagelink: imagelink,
        price: price})
        res.json({
            message: "Course Added",
            courseid: courseid._id //This will give us the course ID 
        })
        console.log(courseid);

})

adminRouter.get("/courses",adminMiddleware, async(req, res)=>{
    const allCourses = await Course.find({});
    res.json({
        message: "All Courses",
        allCourses: allCourses
    });
})


module.exports = adminRouter;