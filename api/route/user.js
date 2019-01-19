const express = require("express")
const router = express.Router();
const userControllers = require("../controllers/user")
const authenticate = require("../middleware/authenticate")


router.post("/register",userControllers.registerController)
router.get("/",authenticate,userControllers.userController)
router.post("/login",userControllers.loginController)



module.exports = router;