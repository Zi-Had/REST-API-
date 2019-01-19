const mongoose = require("mongoose");
const valid = require("validator")
const Schema = mongoose.Schema;
const ContactSchema = new Schema({
    name:{
        type:String,
        trim:true,
        minlength:3
    },
    phone:{
        type:String,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        validate:{
            validator:(v)=>{
                return valid.isEmail(v)
            },
            message:`{VALUE} is not an Email.`
        }
    }
})

const Contact = mongoose.model("Contact",ContactSchema);

module.exports = Contact;