"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiTest_1 = require("./routes/apiTest");
const app = express();
app.use("/api", apiTest_1.apiRouter);
module.exports = app;
