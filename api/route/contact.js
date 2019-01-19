const express = require("express");
const router  = express.Router();
const Contact  =  require("../model/Contact")
const contactController = require("../controllers/contact")


router.get("/",contactController.getAllContactControllers)
router.get("/:id",contactController.getSingleContact)
router.put("/:id",contactController.updateContact)
router.delete("/:id",contactController.deleteContact)
router.post("/",contactController.postNewContact)


module.exports = router;