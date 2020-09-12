'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const path = require("path");

module.exports = () => {
    let app = express();
    const server = require("http").Server(app);
    const io = require("socket.io")(server);
    const { ExpressPeerServer } = require("peer");
    const peerServer = ExpressPeerServer(server, {
      debug: true,
    });
    let create, start;
    create = (config, db) => {
        let routes = require('./routes');
        app.set("view engine", "ejs");
        app.use(express.static(path.join(__dirname,"..","client","build")));
        app.use(express.static(path.join(__dirname, "..", "client", "assets")));
        app.use("/peerjs", peerServer);
        app.set('env', config.env);
        app.set('port', config.port);
        app.set('hostname', config.hostname);
        // Middleware
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        // app.use(logger('dev'));
        app.use(passport.initialize());
        app.use((req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
          next();
        }) 
        mongoose.connect(db.database);
        require('../configs/passport')(passport);
        routes.init(app);
        io.on("connection", (socket) => {
          socket.on("join-room", (RoomId, userId) => {
            console.log("user-joined", RoomId, userId);
            socket.join(RoomId);
            socket.to(RoomId).broadcast.emit("user-connected", userId);
            socket.on("message", (message, user) => {
              io.to(RoomId).emit("createMessage", message, user);
            });
          });
        });
    }
    start = () => {
        let hostname = app.get('hostname');
        let port = app.get('port');
        server.listen(port, () => {
            console.log('Express app Listening on - http://'+hostname+':'+port);
        });
    };
    return  {
        create: create,
        start: start
    };
};