import { Router } from "express";

import CommentController from "../controllers/commentController";

const router:Router = Router();


router.get("/", CommentController.fetchComments);
router.get("/:id",CommentController. showComment);
router.post("/", CommentController.createComment);

router.delete("/:id", CommentController.deleteComment);

export default router;



