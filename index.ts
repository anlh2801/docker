// const bodyParser = require('body-parser')
import bodyParser from "body-parser";
// const express = require("express");
import express from "express";
const tools = require("./demo_api/Tools");
// const cluster = require('cluster');
import cluster from "cluster";

if (cluster.isMaster) {

  // Count the machine's CPUs
  const cpuCount = require("os").cpus().length - 5;

  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  // Listen for dying workers
  cluster.on("exit", function(worker) {

      // Replace the dead worker, we're not sentimental
      console.log("Worker %d died :(", worker.id);
      cluster.fork();

  });

// Code to run if we're in a worker process
} else {

  // Set up the express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(tools.auth);

const router = require("./demo_api/UserApi");
app.use("/router", router);

const PORT = 50000;

app.listen(PORT, () => {
  console.log(`New server running on port ${PORT}`);
});

}
