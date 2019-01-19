const express      = require("express");
const bodyParser   = require("body-parser");
const PORT         = 3000;

const app          = express();
const mongoose     = require("mongoose");

mongoose.connect('mongodb://localhost:27017/contact-db', {useNewUrlParser: true});
const db = mongoose.connection;
db.on("error",(e)=>console.log(e))
db.once("open",(e)=>{
    console.log("Database Is Established");
})

app.use(bodyParser.json());
const contactRoute = require("./api/route/contact")
const userRoute     = require("./api/route/user")
app.use("/contacts",contactRoute);
app.get("/",(req,res)=>{
    res.json({
        message:"This Is Index Page Of Local Host !"
    })
})
app.use("/users",userRoute)

app.listen(PORT,()=>{
    console.log(`Your Port Is Running On ${PORT}`);
})