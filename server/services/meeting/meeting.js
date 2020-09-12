const { v4: uuidv4 } = require("uuid");
const config = require('../../../configs');

const joinMeeting = (req, res) => {
    res.render('room', { 
        roomId: req.params.meetingId,
        port: config.port
    });
};

const startNewMeeting = (req, res) => {
    res.redirect(`/conferences/${uuidv4()}`);
}

module.exports = {
    joinMeeting: joinMeeting,
    startNewMeeting: startNewMeeting
}