// requirements
const  userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const env = require('dotenv')
env.config();
module.exports.register = async (req, res) => {
    try {
        const userData = req.body;
   
        
      if(await userModel.findOne({email: userData.email})){
             return res.status(400).send({"status":"user already exists"})   
      }
        const saltRounds = 10;
        let password = userData.password;

        
        const salt = await bcrypt.genSalt(saltRounds) 
        console.log(salt)
        const hashed = await bcrypt.hash(password, salt)
        console.log(hashed)
        
        userData.password = hashed
        console.log(userData)
        const user = new userModel(userData);
    
        const registeredUser = await user.save();
        if (registeredUser) {
           
            delete userData.password;

          
        var token = await jwt.sign({ userData }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
          });
          return res
            .status(200)
            .send({ message: "registered successful", token: token });
      }
     
    

    

    
  return res.status(400).send({"status":"not registered"})
  } catch (error) {
    return res.status(400).send({ "Not OK! : ": error.message });
  }
};