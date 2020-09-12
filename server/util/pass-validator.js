const athenticateMeeting = (req, res, next) => {
        next();
    res.redirect('/join-private-meeting');
}