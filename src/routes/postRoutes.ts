import { Router } from "express";

import PostController from "../controllers/postController";

const router = Router();

router.post("/",PostController.createPost);

router.get("/",PostController.fetchPosts);

router.put("/:id",PostController.updatePost);

router.get("/:id",PostController.fetchPost)

router.delete("/:id",PostController.deletePost);


export default router;