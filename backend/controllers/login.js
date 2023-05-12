// requirements
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const env = require('dotenv')
env.config();

module.exports.login = async (req, res) => {
  try {
    const email= req.body.email;
    const password = req.body.password;

    console.log(email,password)
    const user = await userModel.findOne({
      email: email,
    });

    console.log(user)
    // console.log(username,password)
    if (user) {
      const hash = user.password;
      const result = await bcrypt.compare(password, hash);
      // console.log(result)
      if (user && result == true) {
        var token = await jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
          expiresIn: "1d",
        });
        return res
          .status(200)
          .send({ message: "login successful", token: token });
      }
    }
    
  return res.send("username or password incorrect")
  } catch (error) {
    return res.status(400).send({ "Not OK! : ": error.message });
  }
};