const valid = require("validator")
const mongoose = require("mongoose");

const Schema = mongoose.Schema
const userSchema = new Schema({
    email:{
        type:String,
        unique:true,
        trim:true,
        validate:{
            validator:(v)=>{
                return valid.isEmail(v)
            },
            message:`{VALUE} is not an Email.`
        }
        
    },
    password:String
})

const User = mongoose.model("user",userSchema);

module.exports = User;