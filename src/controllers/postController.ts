import prisma from "../db/db.config";
import { Request, Response } from "express";

class PostController {
  static async fetchPosts(req: Request, res: Response) {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching posts." });
    }
  }

  static async fetchPost(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id);
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "Post not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the post." });
    }
  }

  static async createPost(req: Request, res: Response) {
    try {
      const { user_id, title, description } = req.body;
      console.log("hello World");
      const newPost = await prisma.post.create({
        data: {
          user_id: Number(user_id),
          title: title,
          description: description,
        },
      });

      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the post." });
    }
  }

  static async updatePost(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id);
      const { user_id, title, description } = req.body;

      const updatedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          user_id: user_id,
          title: title,
          description: description,
        },
      });

      if (updatedPost) {
        return res.status(200).json({ message: "Post updated successfully." });
      }

      return res.status(404).json({ message: "Post not found." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the post." });
    }
  }

  static async deletePost(req: Request, res: Response) {
    try {
      const postId = parseInt(req.params.id);
      const deletedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      if (deletedPost) {
        return res.status(200).json({ message: "Post deleted successfully." });
      }
      return res.status(404).json({ message: "Post not found." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the post." });
    }
  }
}

export default PostController;
