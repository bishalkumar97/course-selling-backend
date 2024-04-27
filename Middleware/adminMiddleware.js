//Importing Admin database
const { Admin } = require("C:/Users/bisha/Desktop/Course web/Database/database");

//Writing admin middleware function
function adminMiddleware (req, res, next){
    const username = req.headers.username;
    const password = req.headers.password;

    Admin.findOne({         
        username: username,
        password: password,
    })
    .then((value=>{
        if(value){
            next();
        } else{
            res.status(404).json({
                mesaage: "Admin don't exist"
            })
        }
    }))

    //We can also make this function asychronous
    // async function adminMiddleware (req, res, next){
    //     const username = req.headers.username;
    //     const password = req.headers.password;

    //     const admin = await Admin.findOne({username, password})
    //     if(admin){
    //         next();
    //     } else {
    //         res.status(404).json({
    //             mesaage: "User don't exist"
    //     })

};



module.exports = adminMiddleware ;