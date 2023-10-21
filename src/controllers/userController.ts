import prisma from "../db/db.config";
import { Request, Response } from "express";

class UserController {
  static async fetchUsers(req: Request, res: Response) {
    try {
      const user = await prisma.user.findMany(
        {
          include:{
            post:true
          }
        }
      );
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching user." });
    }
  }

  static async fetchUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const user = await prisma.user.findFirst({
        where: {
          id: Number(userId),
        },
      });
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while fetching the user." });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (findUser) {
        return res.status(409).json({
          error: "User already exists",
          message: "A user with this email already exists in the system.",
        });
      }
      const newUser = await prisma.user.create({
        data: { name: name, email: email, password: password },
      });
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the user." });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { name, email, password } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(userId),
        },
        data: { name: name, email: email, password: password },
      });
      if (updatedUser) {
        return res.status(200).json({ message: "User updated successfully." });
      }
      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user." });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const deletedUser = await prisma.user.delete({
        where: {
          id: Number(userId),
        },
      });
      if (deletedUser) {
        return res.status(200).json({ message: "User deleted successfully." });
      }
      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user." });
    }
  }
}

export default UserController;
