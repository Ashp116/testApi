const express = require('express');
const fetch = require("node-fetch")
const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

router.get("/accessories", asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let data = await fetch(`https://catalog.roblox.com/v1/search/items/details?Category=11&Subcategory=19&cursor=${Cursor}`)
    let json = await data.json()

    res.json(json)
}))

module.exports = router;