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
exports.apiRouter = void 0;
const express_1 = require("express");
const node_fetch_1 = require("node-fetch");
const Constants_1 = require("../lib/Constants");
const router = (0, express_1.Router)();
const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
        .catch(next);
};
const getSubcategory = (subcategory) => {
    let name = Object.keys(Constants_1.Subcategory).filter((x) => Number.isNaN(Number(x)))[Object.values(Constants_1.Subcategory).filter((x) => Number.isNaN(Number(x))).indexOf(subcategory)];
    return Constants_1.Subcategory[name];
};
router.get("/accessories", asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Cursor = req.query.cursor || "";
    let subCategory = getSubcategory(req.query.subcategory);
    let data = yield (0, node_fetch_1.default)(`${Constants_1.CatalogSearchURL}Category=${Constants_1.Category.Accessories}&Subcategory=${subCategory}&cursor=${Cursor}`);
    let json = yield data.json();
    if (json.errors) {
        res.json({
            "error": {
                msg: json.errors
            }
        });
        return;
    }
    res.json(json);
})));
router.get("/AllItems", asyncMiddleware((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Cursor = req.query.cursor || "";
    let data = yield (0, node_fetch_1.default)(`${Constants_1.CatalogSearchURL}Category=${Constants_1.Category.AllItems}&cursor=${Cursor}`);
    let json = yield data.json();
    if (json.errors) {
        res.json({
            "error": {
                msg: json.errors
            }
        });
        return;
    }
    res.json(json);
})));
exports.apiRouter = router;
