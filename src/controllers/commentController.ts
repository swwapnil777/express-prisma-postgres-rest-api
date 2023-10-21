import prisma from "../db/db.config";
import { Request, Response } from "express";

class CommentController {
  static async fetchComments(req: Request, res: Response) {
    try {
      const comments = await prisma.comment.findMany({
        include: {
          user: true,
          post: {
            include: {
              user: true,
            },
          },
        },
      });
      res.status(200).json({ status: 200, data: comments });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching comments." });
    }
  }

  static async createComment(req: Request, res: Response) {
    const { user_id, post_id, comment } = req.body;

    try {
      await prisma.post.update({
        where: {
          id: Number(post_id),
        },
        data: {
          comment_count: {
            increment: 1,
          },
        },
      });

      const newComment = await prisma.comment.create({
        data: {
          user_id: Number(user_id),
          post_id: Number(post_id),
          comment,
        },
      });

      res
        .status(200)
        .json({
          status: 200,
          data: newComment,
          msg: "Comment created successfully.",
        });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          status: 500,
          error: "An error occurred while creating the comment.",
        });
    }
  }

  static async showComment(req: Request, res: Response) {
    const commentId = req.params.id;

    try {
      const comment = await prisma.comment.findFirst({
        where: {
          id: String(commentId),
        },
      });

      if (comment) {
        res.status(200).json({ status: 200, data: comment });
      } else {
        res.status(404).json({ status: 404, error: "Comment not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          status: 500,
          error: "An error occurred while fetching the comment.",
        });
    }
  }

  static async deleteComment(req: Request, res: Response) {
    const commentId = req.params.id;

    try {
      const comment = await prisma.comment.findFirst({
        where: {
          id: String(commentId),
        },
      });

      if (comment) {
        const postId = comment.post_id;

        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            comment_count: {
              decrement: 1,
            },
          },
        });

        await prisma.comment.delete({
          where: {
            id: String(commentId),
          },
        });

        res
          .status(200)
          .json({ status: 200, msg: "Comment deleted successfully" });
      } else {
        res.status(404).json({ status: 404, error: "Comment not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({
          status: 500,
          error: "An error occurred while deleting the comment.",
        });
    }
  }
}

export default CommentController;
