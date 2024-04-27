const express = require("express");
const adminRouter = require("C:/Users/bisha/Desktop/Course web/Route/index");
const userRouter = require("C:/Users/bisha/Desktop/Course web/Route/user");

const app = express();
const port = 3005;

// Mount admin routes under /admin prefix
app.use("/admin", adminRouter);

// Mount user routes directly
app.use("/user",userRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
