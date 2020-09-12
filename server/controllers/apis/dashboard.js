'use strict';
const express = require('express');
const passport = require('passport');
const router = express.Router();

const dashboardService = require('../../services/dashboard/dashboard');

router.get('/', passport.authenticate('jwt', {session: false}), dashboardService.getDashboard);

module.exports = router;