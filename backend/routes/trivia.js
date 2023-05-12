const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const loginController = require("../controllers/login");
const passport = require("passport");
const passportJwt = require("../middleware/passport")(passport);
const registerController = require('../controllers/register')

router.post(
  "/login",
 // passport.authenticate("jwt", { session: false }),
  loginController.login
);
router.post("/register",registerController.register)
module.exports = router;

