//Importing all the modules 
const express = require("express");

const userMiddleware = require("C:/Users/bisha/Desktop/Course web/Middleware/UserMiddleware");
const { User, Course} = require("C:/Users/bisha/Desktop/Course web/Database/database");

const userRouter = express.Router();
userRouter.use(express.json()); 

userRouter.post("/signup", (req, res)=>{
    const username =req.body.username;
    const password =req.body.password;

     User.create({
        
        username: username,
        password: password
        
    })
    res.json({
        message: "User Added"
    })
})

//This is open to the world to show what'll courses are available therfore no userMiddleware used
userRouter.get("/courses", async(req, res)=>
{
    const response = await Course.find();
    res.json({
        message: response}
    );

});

//We'll fetch the purchased courses of the user, so we'll use the userMiddleware 
//We'll have to place the course ID in the route thats need to be fetch
userRouter.post("/course/:courseID", userMiddleware, async(req, res)=>{
    const courseID = req.params.courseID; //params to take input from the parameters from the route
    const username = req.headers.username;
    const password = req.headers.password;

     await User.updateOne({
        username: username,
        password: password
    },
    {
        $push : {                        //This will push the course to the user DB
            purchasedCourse: courseID }
    })
    res.json({
        message: "Course Purchased"
    })
})

//This is to fetch the purchased courses of the user
userRouter.get("/purchasedCourses", userMiddleware, async(req, res)=>{
    const user = await User.findOne({
     username : req.headers.username,
     password: req.headers.password
    });
    const course = await Course.find({
        _id : {"$in": user.purchasedCourse} //in is used to print all the courses the user have
    })
    res.json({
        course: course
    })

})

//Exporting the userRouter
module.exports = userRouter;