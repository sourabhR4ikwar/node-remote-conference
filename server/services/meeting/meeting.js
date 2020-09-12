const { v4: uuidv4 } = require("uuid");

const joinMeeting = (req, res) => {
    res.render('room', { roomId: req.params.meetingId});
};

const startNewMeeting = (req, res) => {
    res.redirect(`/conferences/${uuidv4()}`);
}

module.exports = {
    joinMeeting: joinMeeting,
    startNewMeeting: startNewMeeting
}