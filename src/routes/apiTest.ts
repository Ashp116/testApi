import {Router} from "express";
import {Accessories, AllItems, BodyParts, Clothing, Collectables, Hairs} from "../lib/Middleware";
const router = Router();

router.get("/accessories", Accessories)
router.get("/AllItems", AllItems)
router.get("/Clothing", Clothing)
router.get("/BodyParts", BodyParts)
router.get("/collectables", Collectables)
router.get("/hairs", Hairs)

export const apiRouter = router