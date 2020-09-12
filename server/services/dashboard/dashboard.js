'use strict';

const getDashboard = (req, res) => {
    res.json({
        message: 'Dashboard Here'
    });
}

module.exports = { getDashboard: getDashboard};