"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductInfo = void 0;
const node_fetch_1 = require("node-fetch");
const Constants_1 = require("./Constants");
function AddProductInfo(id, assetInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            (0, node_fetch_1.default)(`${Constants_1.ProductInfoURL}?assetId=${id}`)
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                let json = yield data.json();
                let AdditionData = {
                    IsNew: json.IsNew,
                    IsForSale: json.IsForSale,
                    IsPublicDomain: json.IsPublicDomain,
                    IsLimited: json.IsLimited,
                    IsLimitedUnique: json.IsLimitedUnique,
                    Remaining: json.Remaining,
                };
                resolve(Object.assign({}, assetInfo, AdditionData));
            }))
                .catch(err => {
                reject(err);
            });
        });
    });
}
exports.AddProductInfo = AddProductInfo;
