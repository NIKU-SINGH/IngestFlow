"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pino_1 = require("pino");
var dayjs = require("dayjs");
var log = (0, pino_1.default)({
    level: "debug",
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false,
    },
    timestamp: function () { return ",\"time\":\"".concat(dayjs().format(), "\""); },
});
exports.default = log;
