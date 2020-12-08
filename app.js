'use strict'
const server = require('./server')();
const config = require('./configs');
const db = require('./configs/db');
const cluster = require('cluster');
const os = require('os');



if (cluster.isMaster) {
  const cpuCount = os.cpus().length;

  for (let j = 0; j < cpuCount; j++) {
    cluster.fork();
  }

} else {
  server.create(config, db);
  server.start();
}

cluster.on('exit', function (worker) {
  console.log(`Worker ${worker.id} died'`);
  console.log(`Staring a new one...`);
  cluster.fork();
});



