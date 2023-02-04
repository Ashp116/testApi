"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const apiTest_1 = require("./routes/apiTest");
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log("Listening to localhost:" + port);
});
app.use("/api", apiTest_1.apiRouter);
