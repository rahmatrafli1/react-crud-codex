import { Router } from "express";
import UserController from "../controller/userController.js";

const userRoute = Router();

userRoute.get("/", UserController.getUsers);
userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);
userRoute.put("/edit/:id", UserController.updateUsers);
userRoute.delete("/delete/:id", UserController.deleteUsers);
userRoute.get("/detail/:id", UserController.getDetailUsers);

export default userRoute;
