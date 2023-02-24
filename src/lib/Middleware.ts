import {CatalogSearchURL, Category, CollectablesUrl, Subcategory} from "./Constants";
import {asyncMiddleware, clampMin, getSubcategory, returnJson} from "./Util";
import fetch from "node-fetch"

export const Accessories =  asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let Keyword = req.query.Keyword
    let subCategory = getSubcategory(req.query.subcategory)
    let url = `${CatalogSearchURL}Category=${Category.Accessories}&Subcategory=${subCategory}&cursor=${Cursor}`

    if (Keyword) {
          Keyword.shift()
        url = `${url}&Keyword=${Keyword[0]}`
    }

    let data = await fetch(url)
    let json = await data.json()
    returnJson(json, res)
})

export const AllItems = asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let Keyword = req.query.Keyword
    let url = `${CatalogSearchURL}Category=${Category.AllItems}&cursor=${Cursor}&Keyword=${Keyword}`

    if (Keyword) {
          Keyword.shift()
        url = `${url}&Keyword=${Keyword[0]}`
    }

    let data = await fetch(url)
    let json = await data.json()
    returnJson(json, res)
})

export const Clothing = asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let Keyword = req.query.Keyword
    let subCategory = getSubcategory(req.query.subcategory)
    let url = `${CatalogSearchURL}Category=${Category.Clothing}&Subcategory=${subCategory}&cursor=${Cursor}`

    if (Keyword) {
          Keyword.shift()
        url = `${url}&Keyword=${Keyword[0]}`
    }

    let data = await fetch(url)
    let json = await data.json()
    returnJson(json, res)
})

export const Hairs = asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let Keyword = req.query.Keyword

    let url = `${CatalogSearchURL}Category=${4}&Subcategory=${Subcategory.HairAccessories}&cursor=${Cursor}`

    if (Keyword) {
        Keyword.shift()
        url = `${url}&Keyword=${Keyword[0]}`
    }

    let subCategory = getSubcategory(req.query.subcategory)
    let data = await fetch(url)
    let json = await data.json()
    returnJson(json, res)
})

export const BodyParts = asyncMiddleware( async (req, res) => {
    let Cursor = req.query.cursor || ""
    let Keyword = req.query.Keyword
    let url = `${CatalogSearchURL}Category=${Category.BodyParts}&cursor=${Cursor}`

    if (Keyword) {
          Keyword.shift()
        url = `${url}&Keyword=${Keyword[0]}`
    }

    let data = await fetch(url)
    let json = await data.json()
    returnJson(json, res)
})

export const Collectables = asyncMiddleware(async (req, res) => {
    let Cursor = parseInt(req.query.cursor) || 0
    let Limit = parseInt(req.query.limit) || 10
    let data = await fetch(CollectablesUrl)
    let json = await data.json()

    let sendJson = {
        nextPageCursor: Cursor + 1,
        previousPageCursor: clampMin(Cursor-1,0),
        data: {}
    }
    let slicedKeys = (Object.keys(json.items).slice((Limit*Cursor), (Limit*(Cursor+1))))

    slicedKeys.forEach((value, index) => {
        sendJson["data"][value] = json.items[value]
    })

    returnJson(sendJson, res)
})