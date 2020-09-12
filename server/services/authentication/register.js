'use strict';

const express = require('express');
const { response } = require('express');
const User = require('../../models/User');

const httpMessages = {
    onValidationError: {
        success: false,
        message: 'Please enter valid email and password.'
    },
    onUserSaveError: {
        success: false,
        message: 'That email address already exists.'
    },
    onUserSaveSuccess: {
        success: true,
        message: 'Successfully created new user'
    }
};

const registerUser = (req, res) => {
    let { email, password } = req.body;
    if(!email || !password){
        res.json(httpMessages.onValidationError);
    }else{
        let newUser = new User({
            email: email,
            password: password
        });
        newUser.save(err => {
            if(err){
                console.log(err);
                return res.json(httpMessages.onUserSaveError);
            }
            res.json(httpMessages.onUserSaveSuccess);
        });
    }
}

module.exports = {
    registerUser: registerUser
};