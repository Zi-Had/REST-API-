const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");


const registerController = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.json({
                error:err
            })
           
        }
        let user = new User({
            email:req.body.email,
            password:hash
        })
        user.save()
             .then(result=>{
                 res.json({
                     message:"registration Successfully",
                     result
                 }).status(201)
             })
             .catch(err=>{
                 res.json({
                     message:err
                 })
             })
    })


 }
const loginController = (req,res,next)=>{
      const email = req.body.email;
      const password = req.body.password ;

      User.findOne({email})
          .then(user =>{
              if(user){
                  bcrypt.compare(password,user.password,(err,result)=>{
                      if(err){
                          res.json({
                              message:"Error Occurred."
                          })
                      }

                      if(result){
                          const token  = jwt.sign({email:user.email, _id:user._id},"SECRET",
                          {expiresIn:"2h" })

                          res.json({
                              message:"Login Successful",
                              token
                          })
                      }else{
                          res.json({
                              message:"Login failed . Password Doesn't exist "
                          })
                      }
                  })
              }else{
                  res.json({
                      message:"User Not found"
                  })
              }
          })
          
}
const userController = (req,res,next)=>{
    User.find()
        .then(result=>{
            res.json({
                message:"All Users",
                result
            })
        })
        .catch(err=>{
            res.json({
                message:"Error Occurred",
                err
            })
        })
}

module.exports = {
    registerController,
    loginController,
    userController
}