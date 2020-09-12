'use strict';

const path = require('path');
const apiRoute = require('./apis');
const meetingRoute = require('./meetings');

const init = (server) => {
    server.use('*', (req, res, next) => {
        console.log(req.url);
        console.log('Request was made to: ' + req.originalUrl);
        return next();
        // res.send('hello');
    });
    server.use('/api', apiRoute);
    server.use('/conferences', meetingRoute);
    server.use('*', (req, res) => {
        res.sendFile(path.join(__dirname,"..","..","client","build","index.html"));
    });
}

module.exports = {
    init: init
}