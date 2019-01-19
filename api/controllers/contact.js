const Contact  = require("../model/Contact")

const getAllContactControllers = (req,res,next)=>{
        Contact.find()
            .then(data=>{
                res.json({
                    message:"All Contacts",
                    data
                })
            })
            .catch(err=>{
                res.json({
                    message:"Error",
                    error:err
                }).status(500)
            })
}
const getSingleContact = (req,res,next)=>{
    let id = req.params.id
    Contact.findById(id)
           .then(data=>{
               res.json({
                   message:"Single Id",
                   data
               })
           })
           .catch(err=>{
            res.json({
                message:"Error",
                error:err
            }).status(500)
        })
}
const postNewContact =(req,res,next)=>{
      const contact = new Contact({
          name:req.body.name,
          phone:req.body.phone,
          email:req.body.email
      })
      contact.save()
             .then(data=>{
                 res.json({
                     message:"New contact Added",
                     data
                 })
             })
             .catch(err=>{
                 res.json({
                     message:"Error",
                     error:err
                 }).status(500)
             })
}


const updateContact = (req,res,next)=>{
    let id  = req.params.id

    const updatedData = {
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    }
    Contact.findByIdAndUpdate(id,{$set:updatedData})
           .then(update=>{
               Contact.findById(Contact._id)
                      .then(newUpdate=>{
                         res.json({
                          message:"Update Successfully",
                          update
                         }) 
               })
               
           })
           .catch(err=>{
               res.json({
                   message:"Error",
                   err
               })
           })
}

const deleteContact = (req,res,next)=>{
    let id = req.params.id
    Contact.findByIdAndRemove(id)
        .then(result=>{
            res.json({
                message:"Contact Removed",
                result
            })
        })
        .catch(err=>{
            res.json({
                message:"Error",
                error:err
            }).status(500)
        })
}

module.exports = {
    getAllContactControllers,
    postNewContact,
    getSingleContact,
    updateContact,
    deleteContact
}