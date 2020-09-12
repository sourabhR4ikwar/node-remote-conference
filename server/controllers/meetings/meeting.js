'use strict';
const express = require('express');
const passport = require('passport');
let router = express.Router();

const meetingService = require('../../services/meeting/meeting');

// router.get('/', passport.authenticate('jwt', {session: false}), meetingService.joinMeeting);
router.get("/new-public", meetingService.startNewMeeting);
router.get("/:meetingId", meetingService.joinMeeting);

module.exports = router;