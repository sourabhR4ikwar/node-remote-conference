'use strict';
const express = require('express');
let router = express.Router();

const meetingController = require('../../controllers/meetings/meeting');

router.use("/", meetingController);

module.exports = router;