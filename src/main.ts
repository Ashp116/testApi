import * as express from "express"
import {apiRouter} from "./routes/apiTest";

const app = express()
const port = 3000

app.listen(port, () => {
    console.log("Listening to localhost:"+port)
})

app.use("/api", apiRouter)