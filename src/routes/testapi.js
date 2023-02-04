const express = require('express');
const router = express.Router();

router.get("/accessories", async (req, res) => {
    let Cursor = req.query.cursor || ""
    let data = await fetch(`https://catalog.roblox.com/v1/search/items/details?Category=11&Subcategory=19&cursor=${Cursor}`)
    let json = await data.json()

    res.send(json)
})

module.exports = router;