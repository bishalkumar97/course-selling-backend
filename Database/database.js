//Importing the Mongoose library
const mongoose = require("mongoose");

//Creating the connection
mongoose.connect("mongodb+srv://2101020064:YHIYoSPkoLi2IPNn@cluster0.2xlhdpn.mongodb.net/Course_Web");

//Defining the Admin Schema
const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

//Defining the User Schema that contain an array of object (purchasedCourse)
const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]

});

//Defining the Course Schema
const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imagelink: String,
    price: Number
});

//Compiling the Mongoose schema into a model, which represents a collection in MongoDB
const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema)
const Course = mongoose.model("Course", CourseSchema);

//Exporting for other modules
module.exports = {
    Admin,
    User,
    Course
}