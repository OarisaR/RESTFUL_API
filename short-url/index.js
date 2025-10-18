const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const {restrictTo ,checkAuthentication} = require("./middlewares/auth");
//routes
const urlRoute = require("./routes/url"); 
const staticRouter = require("./routes/staticRouter");
const userRoute = require("./routes/user");


const URL = require("./models/url"); //model
const PORT = 8001;

const { connectDB } = require("./connection");
connectDB(
  "mongodb-url!!"
)
  .then(() => console.log("MONGODB connected"))
  .catch((err) => console.log("Connection failed", err));


app.set("view engine", "ejs"); // i need a view engine of EJS for server side rendering
app.set("views", path.resolve("./views"));


app.use(express.json()); // a middlewares that parses json body
app.use(express.urlencoded({extended:false})); //for form data
app.use(cookieParser());
app.use(checkAuthentication);

app.use("/url",  restrictTo(["NORMAL" , "ADMIN"]), urlRoute);
/*
“For any route that starts with /url, first run restrictTo,
 and only if the user passes that check, then run urlRoute.
*/

app.use("/", staticRouter);

app.use("/user",userRoute);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));

