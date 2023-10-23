import { Router } from "express";
import ItemController from "../controller/itemController.js";

const itemRoute = Router();

itemRoute.get("/", ItemController.getAllItems);
itemRoute.post("/add", ItemController.add);
itemRoute.put("/edit/:id", ItemController.updateItems);
itemRoute.delete("/delete/:id", ItemController.deleteItems);
itemRoute.get("/detail/:id", ItemController.getDetailItems);

export default itemRoute;
