"use strict";
const ip = require('ip');
let productionConfig = { hostname: ip.address(), port: process.env.PORT };

module.exports = productionConfig;
