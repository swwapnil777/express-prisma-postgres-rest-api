import { Router } from "express";

import userController from "../controllers/userController";

const router = Router();

router.post("/",userController.createUser);

router.get("/",userController.fetchUsers);

router.put("/:id",userController.updateUser);

router.get("/:id",userController.fetchUser)

router.delete("/:id",userController.deleteUser);


export default router;