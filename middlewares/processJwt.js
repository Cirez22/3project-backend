const jwt = require("jsonwebtoken");

const User = require('../models/UserModel');

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      data,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject(err)
        } else {
          resolve(token);
        }
      }
    );
  });
};


const validateJwt = async (req, res, next) => {
  const token = req.header('Authorize');
  if (!token) return res.status(400).json({ message: 'Token Not Found' });
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(uid)
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" })
  }
}

const revalidateJwt = async (req, res) => {
  const user = req.user;
  const token = await generateJwt(user._id)
  try {
    return res.json({ user, token })
  } catch (error) {
    console.log(error);
  }
}

const isAdmin = async (req,res,next) => {
  if (!req.user) {
    return res.status(500).json({message:`User ${name} does not have privilages`})
  }
  next();
}


module.exports = {
  validateJwt,
  revalidateJwt,
  isAdmin,
  generateJwt
}