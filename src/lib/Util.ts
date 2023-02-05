import fetch from "node-fetch"
import {ProductInfoURL, Subcategory} from "./Constants"
import {Response} from "express";

export async function AddProductInfo(id, assetInfo) {
    return new Promise((resolve, reject) => {
        fetch(`${ProductInfoURL}?assetId=${id}`)
            .then(async data => {
                let json = await data.json()
                let AdditionData = {
                    IsNew: json.IsNew,
                    IsForSale:	json.IsForSale,
                    IsPublicDomain:	json.IsPublicDomain,
                    IsLimited: json.IsLimited,
                    IsLimitedUnique:json.IsLimitedUnique,
                    Remaining: json.Remaining,

                }
                resolve(Object.assign({}, assetInfo, AdditionData))
            })
            .catch(err => {
                reject(err)
            })
    });
}

export const returnJson = (json ,res: Response) => {
    if (json.errors) {
        res.json({
            "error": {
                msg: json.errors
            }
        })

        return
    }

    res.json(json)
}
export const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};

export const clampMin = (x:number, min: number) =>{
    if (x < min) {
        return min
    }
    return x
}

export const getSubcategory = (subcategory) => {
    let name = Object.keys(Subcategory).filter((x) => Number.isNaN(Number(x)))[ Object.values(Subcategory).filter((x) => Number.isNaN(Number(x))).indexOf(subcategory)]
    return Subcategory[name]
}