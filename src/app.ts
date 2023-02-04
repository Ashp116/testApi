import * as express from "express"
import {apiRouter} from "./routes/apiTest";

const app = express()

app.use("/api", apiRouter)

module.exports = app