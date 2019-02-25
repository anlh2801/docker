"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const bodyParser = require('body-parser')
const body_parser_1 = __importDefault(require("body-parser"));
// const express = require("express");
const express_1 = __importDefault(require("express"));
const tools = require("./demo_api/Tools");
// const cluster = require('cluster');
const cluster_1 = __importDefault(require("cluster"));
if (cluster_1.default.isMaster) {
    // Count the machine's CPUs
    const cpuCount = require("os").cpus().length - 5;
    // Create a worker for each CPU
    for (let i = 0; i < cpuCount; i += 1) {
        cluster_1.default.fork();
    }
    // Listen for dying workers
    cluster_1.default.on("exit", function (worker) {
        // Replace the dead worker, we're not sentimental
        console.log("Worker %d died :(", worker.id);
        cluster_1.default.fork();
    });
    // Code to run if we're in a worker process
}
else {
    // Set up the express app
    const app = express_1.default();
    // parse application/x-www-form-urlencoded
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    // parse application/json
    app.use(body_parser_1.default.json());
    app.use(tools.auth);
    const router = require("./demo_api/UserApi");
    app.use("/router", router);
    const PORT = 50000;
    app.listen(PORT, () => {
        console.log(`New server running on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map