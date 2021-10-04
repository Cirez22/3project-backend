const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    loginUser,
    signUpUser
} = require('../controllers/authController');

router.get('/', getAllUsers);

router.post('/login', loginUser);

router.post('/signup', signUpUser);

module.exports = router;