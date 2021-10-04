const bcrypt = require('bcryptjs');
const { generateJwt } = require('../middlewares/processJwt');
const UserModel = require('../models/UserModel');


const getAllUsers = async (req, res) => {
  const users = await UserModel.find();
  try {
    if (users.length === 0) {
     return res.status(400).json({message: "No users found"}); 
    }
    console.log("CODE REACHED")
    return res.status(200).json(users);
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: "Couldn't get the users"})
  }
}

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({message: "Couldn't get user"})
  }
}

const signUpUser = async (req, res) => {
  const { email } = req.body
  const testEmail = await UserModel.findOne({email}); 
  if (testEmail) {
    return res.status(500).json({message: "Email already in use"});
  }
  const user = new UserModel(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the user"});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({email});
  if (!user) {
    return res.status(500).json({message: "Please check credentials"}) // user not found
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({message: "Please check credentials"});
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({user, token});
}

module.exports = {
  getAllUsers,
  getUserById,
  signUpUser,
  loginUser
}