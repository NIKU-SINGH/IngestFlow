"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var index_1 = require("../../utils/logger/src/index");
var app = express();
var port = process.env.PORT ? parseInt(process.env.PORT) : 3001;
app.use(express.json());
app.get('/', function (req, res) {
    res.send('LogCollector is running Successfully');
});
app.post('/ingest', function (req, res) {
    try {
        var requestBody = JSON.stringify(req.body);
        index_1.default.info("Logs received are: ".concat(requestBody));
        res.send(requestBody);
    }
    catch (error) {
        index_1.default.error("Error logging request body: ".concat(error));
        res.status(500).send("Internal Server Error");
    }
});
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: LogCollector is running at http://localhost:".concat(port));
});
