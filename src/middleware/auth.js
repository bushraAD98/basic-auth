const base64 = require("base-64");
const bcrypt = require("bcrypt");
const { users } = require("../models/index");

const basicAuth = async (req, res, next) => {
  if (req.headers["authorization"]) {
    //in postman we will send the req inside the auth header
    let encodedPart = req.headers.authorization.split(" ")[1]; //make array put the str in it & split it
    console.log(req.headers["authorization"]);
    // let encodedPart = basicHeaderParts.pop();

    let decoded = base64.decode(encodedPart);
    let [userName, passWord] = decoded.split(":");
    console.log(decoded);
    console.log(encodedPart);
    //    console.log(basicHeaderParts);
    // console.log(passWord);
    try {
      const user = await users.findOne({ where: { userName: userName } });
      console.log("hello", user);
      if (user) {
        const valid = await bcrypt.compare(passWord, user.passWord);
        if (valid) {
          req.user = user;
          next();
        } else {
          next("user is not valid");
        }
      }
      else{
        next("user is not valid");  
      }
    } catch (error) {
      next(error);
    }
  }
};

module.exports = basicAuth;
