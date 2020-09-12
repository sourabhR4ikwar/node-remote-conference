'use strict';
const express = require('express');
const apiRoutes = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const db = require('../../../configs/db');

const User = require('../../models/User');

const httpResponse = {
    onUserNotFound: {
        success: false,
        message: 'User not found.',
    },
    onAuthenticationFail: {
        success: false,
        message: 'Passwords did not match.'
    }
}

const loginUser = (req, res) => {
    let { email, password} = req.body;
    User.findOne({ email: email }, (err, user) => {
        if(err){
            throw error;
        }
        if(!user){
            return res.json(httpResponse.onUserNotFound)
        }
        user.comparePassword(password, (err, isMatch) => {
            if(isMatch && !err){
                var token = jwt.sign(user.toJSON(), db.secret, { expiresIn: 10080});
                return res.json({
                    success: true,
                    token: 'bearer '+ token,
                    data: {
                        userId: user.id,
                        email: user.email,
                        displayName: !user.displayName?user.email:user.displayName,
                    }
                });
            }
            res.json(httpResponse.onAuthenticationFail);
        });
    });
}

module.exports = { loginUser: loginUser};