'use strict';
const express = require('express');
let router = express.Router();

const registerController = require('../../controllers/apis/register');
const loginController = require('../../controllers/apis/login');
const dashboardController = require('../../controllers/apis/dashboard');
const userController = require('../../controllers/apis/user');

router.use('/register', registerController);
router.use('/login', loginController);
router.use('/dashboard', dashboardController);
router.use('/user', userController);

module.exports = router;