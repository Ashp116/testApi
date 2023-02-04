import fetch from "node-fetch"
import {ProductInfoURL} from "./Constants"

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