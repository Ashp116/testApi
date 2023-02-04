import {Router} from "express";
import fetch from "node-fetch";
import {CatalogSearchURL, Category, Subcategory} from "../lib/Constants";
const router = Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

const getSubcategory = (subcategory) => {
   let name = Object.keys(Subcategory).filter((x) => Number.isNaN(Number(x)))[ Object.values(Subcategory).filter((x) => Number.isNaN(Number(x))).indexOf(subcategory)]
    return Subcategory[name]
}

router.get("/accessories", asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let subCategory = getSubcategory(req.query.subcategory)
    let data = await fetch(`${CatalogSearchURL}Category=${Category.Accessories}&Subcategory=${subCategory}&cursor=${Cursor}`)
    let json = await data.json()

    if (json.errors) {
        res.json({
            "error": {
                msg: json.errors
            }
        })

        return
    }

    res.json(json)
}))

router.get("/AllItems", asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let data = await fetch(`${CatalogSearchURL}Category=${Category.AllItems}&cursor=${Cursor}`)
    let json = await data.json()

    if (json.errors) {
        res.json({
            "error": {
                msg: json.errors
            }
        })

        return
    }

    res.json(json)
}))

export const apiRouter = router