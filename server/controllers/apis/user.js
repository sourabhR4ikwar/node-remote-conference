'use strict';

const express = require('express');
const userService = require('../../services/user/user');

let router = express.Router();

router.post('/change-display-name', userService.changeDisplayName);

module.exports = router;